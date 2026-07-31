import { fireEvent, screen, waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { RequestAccessResult, RequestAccessService } from './service.ts'
import { initializeRequestAccess } from './controller.ts'

function renderForm() {
  document.body.innerHTML = `
    <div id="request-slot">
      <form id="request-form">
        <label for="email">Email address</label>
        <div class="request-form__controls">
          <input id="email" name="email" type="email" required>
          <button class="request-form__submit" type="submit">
            <span>Request Access</span>
          </button>
        </div>
        <p id="email-error" hidden>Oops! Please check your email</p>
      </form>
      <p id="request-status" class="visually-hidden" aria-live="polite" hidden></p>
    </div>
  `
}

function deferredRequest() {
  let resolveRequest: ((result: RequestAccessResult) => void) | undefined
  let rejectRequest: ((reason?: unknown) => void) | undefined

  const promise = new Promise<RequestAccessResult>((resolve, reject) => {
    resolveRequest = resolve
    rejectRequest = reject
  })

  return {
    promise,
    resolve: (result: RequestAccessResult) => resolveRequest?.(result),
    reject: (reason?: unknown) => rejectRequest?.(reason),
  }
}

describe('initializeRequestAccess', () => {
  beforeEach(() => {
    renderForm()
  })

  it('retains native validation when required markup is missing', () => {
    document.querySelector('#request-status')?.remove()
    const form = document.querySelector<HTMLFormElement>('#request-form')
    const service: RequestAccessService = {
      requestAccess: vi.fn(),
    }

    expect(initializeRequestAccess(document, service)).toBeNull()
    expect(form?.noValidate).toBe(false)
  })

  it('shows validation only after submit and clears it after a valid correction', async () => {
    const user = userEvent.setup()
    const service: RequestAccessService = {
      requestAccess: vi.fn(),
    }

    initializeRequestAccess(document, service)

    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Email address' })
    const submit = screen.getByRole('button', { name: 'Request Access' })

    await user.type(input, 'john#mail.com')
    expect(input).not.toHaveAttribute('aria-invalid')

    await user.click(submit)
    expect(service.requestAccess).not.toHaveBeenCalled()
    expect(input).toHaveValue('john#mail.com')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby', 'email-error')
    expect(screen.getByText('Oops! Please check your email')).toBeVisible()
    expect(input).toHaveFocus()

    await user.clear(input)
    await user.type(input, 'person@example.com')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(screen.getByText('Oops! Please check your email')).not.toBeVisible()

    await user.clear(input)
    await user.type(input, 'invalid-again')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('guards a pending request and replaces the form only after affirmative success', async () => {
    const user = userEvent.setup()
    const pending = deferredRequest()
    const service: RequestAccessService = {
      requestAccess: vi.fn(() => pending.promise),
    }

    initializeRequestAccess(document, service)

    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Email address' })
    const submit = screen.getByRole('button', { name: 'Request Access' })

    await user.type(input, ' person@example.com ')
    await user.click(submit)

    expect(service.requestAccess).toHaveBeenCalledOnce()
    expect(service.requestAccess).toHaveBeenCalledWith('person@example.com')
    expect(input).toHaveValue('person@example.com')
    expect(input).toHaveAttribute('readonly')
    expect(submit).toHaveAttribute('aria-disabled', 'true')
    expect(submit).toHaveTextContent('Requesting…')
    expect(document.querySelector('#request-form')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByText('Requesting access…')).toBeInTheDocument()

    fireEvent.submit(document.querySelector('#request-form') as HTMLFormElement)
    expect(service.requestAccess).toHaveBeenCalledOnce()

    pending.resolve({ accepted: true })

    await waitFor(() => {
      expect(screen.getByText('Thanks! Your request has been received.')).toHaveFocus()
    })
    expect(document.querySelector('#request-form')).not.toBeInTheDocument()
    expect(document.querySelector('#request-status')).toHaveAttribute('hidden')
  })

  it('restores the form and preserves the email after a service failure', async () => {
    const user = userEvent.setup()
    const pending = deferredRequest()
    const service: RequestAccessService = {
      requestAccess: vi.fn(() => pending.promise),
    }

    initializeRequestAccess(document, service)

    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Email address' })
    const submit = screen.getByRole('button', { name: 'Request Access' })

    await user.type(input, 'person@example.com')
    await user.click(submit)
    pending.reject(new Error('network unavailable'))

    await waitFor(() => {
      expect(
        screen.getByText('We couldn’t complete your request. Please try again.'),
      ).toBeVisible()
    })

    expect(input).toHaveValue('person@example.com')
    expect(input).not.toHaveAttribute('readonly')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(submit).not.toHaveAttribute('aria-disabled')
    expect(submit).toHaveTextContent('Request Access')
    expect(document.querySelector('#request-form')).not.toHaveAttribute('aria-busy')
  })
})
