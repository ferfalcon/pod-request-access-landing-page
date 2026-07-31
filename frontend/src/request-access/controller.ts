import type { RequestAccessResult, RequestAccessService } from './service.ts'
import { validateEmail } from './validation.ts'

type RequestState = 'idle' | 'validation-error' | 'submitting' | 'service-error' | 'success'

type RequestAccessElements = {
  form: HTMLFormElement
  input: HTMLInputElement
  submitButton: HTMLButtonElement
  submitLabel: HTMLSpanElement
  emailError: HTMLParagraphElement
  requestStatus: HTMLParagraphElement
  requestSlot: HTMLDivElement
}

const validationMessage = 'Oops! Please check your email'
const submittingMessage = 'Requesting access…'
const serviceErrorMessage = 'We couldn’t complete your request. Please try again.'
const successMessage = 'Thanks! Your request has been received.'

function resolveElements(root: Document): RequestAccessElements | null {
  const form = root.querySelector('#request-form')
  const input = root.querySelector('#email')
  const submitButton = root.querySelector('.request-form__submit')
  const submitLabel = submitButton?.querySelector('span')
  const emailError = root.querySelector('#email-error')
  const requestStatus = root.querySelector('#request-status')
  const requestSlot = root.querySelector('#request-slot')

  if (
    !(form instanceof HTMLFormElement) ||
    !(input instanceof HTMLInputElement) ||
    !(submitButton instanceof HTMLButtonElement) ||
    !(submitLabel instanceof HTMLSpanElement) ||
    !(emailError instanceof HTMLParagraphElement) ||
    !(requestStatus instanceof HTMLParagraphElement) ||
    !(requestSlot instanceof HTMLDivElement)
  ) {
    return null
  }

  return {
    form,
    input,
    submitButton,
    submitLabel,
    emailError,
    requestStatus,
    requestSlot,
  }
}

function isAffirmativeResult(result: RequestAccessResult | unknown): result is RequestAccessResult {
  if (typeof result !== 'object' || result === null) {
    return false
  }

  return 'accepted' in result && result.accepted === true
}

export function initializeRequestAccess(
  root: Document,
  service: RequestAccessService,
): (() => void) | null {
  const elements = resolveElements(root)

  if (!elements || elements.form.dataset.enhanced === 'true') {
    return null
  }

  const {
    form,
    input,
    submitButton,
    submitLabel,
    emailError,
    requestStatus,
    requestSlot,
  } = elements

  let state: RequestState = 'idle'
  let requestGeneration = 0
  let isActive = true

  const setState = (nextState: RequestState) => {
    state = nextState
    form.dataset.state = nextState
  }

  const clearValidationError = () => {
    input.removeAttribute('aria-invalid')
    input.removeAttribute('aria-describedby')
    emailError.hidden = true
    emailError.textContent = validationMessage
  }

  const clearRequestStatus = () => {
    requestStatus.textContent = ''
    requestStatus.hidden = true
    requestStatus.classList.add('visually-hidden')
    requestStatus.removeAttribute('data-kind')
  }

  const showValidationError = () => {
    clearRequestStatus()
    setState('validation-error')
    input.setAttribute('aria-invalid', 'true')
    input.setAttribute('aria-describedby', emailError.id)
    emailError.textContent = validationMessage
    emailError.hidden = false
    input.focus()
  }

  const showSubmitting = () => {
    setState('submitting')
    form.setAttribute('aria-busy', 'true')
    input.readOnly = true
    submitButton.setAttribute('aria-disabled', 'true')
    submitLabel.textContent = 'Requesting…'
    requestStatus.textContent = submittingMessage
    requestStatus.hidden = false
    requestStatus.classList.add('visually-hidden')
    requestStatus.removeAttribute('data-kind')
  }

  const restoreControls = () => {
    form.removeAttribute('aria-busy')
    input.readOnly = false
    submitButton.removeAttribute('aria-disabled')
    submitLabel.textContent = 'Request Access'
  }

  const showServiceError = () => {
    restoreControls()
    clearValidationError()
    setState('service-error')
    requestStatus.textContent = serviceErrorMessage
    requestStatus.hidden = false
    requestStatus.classList.remove('visually-hidden')
    requestStatus.dataset.kind = 'service-error'
  }

  const showSuccess = () => {
    restoreControls()
    clearValidationError()
    clearRequestStatus()
    setState('success')

    const confirmation = root.createElement('p')
    confirmation.className = 'request-success'
    confirmation.tabIndex = -1
    confirmation.textContent = successMessage
    requestSlot.insertBefore(confirmation, requestStatus)
    form.remove()
    confirmation.focus()
  }

  const handleCorrection = () => {
    if (state === 'validation-error') {
      if (validateEmail(input.value).isValid) {
        clearValidationError()
        setState('idle')
      }
      return
    }

    if (state === 'service-error') {
      clearRequestStatus()
      setState('idle')
    }
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()

    if (!isActive || state === 'submitting' || state === 'success') {
      return
    }

    clearValidationError()
    clearRequestStatus()

    const validation = validateEmail(input.value)
    if (!validation.isValid) {
      showValidationError()
      return
    }

    input.value = validation.normalizedEmail
    showSubmitting()

    const currentGeneration = ++requestGeneration

    try {
      const result = await service.requestAccess(validation.normalizedEmail)

      if (
        !isActive ||
        currentGeneration !== requestGeneration ||
        form.dataset.state !== 'submitting'
      ) {
        return
      }

      if (!isAffirmativeResult(result)) {
        showServiceError()
        return
      }

      showSuccess()
    } catch {
      if (
        !isActive ||
        currentGeneration !== requestGeneration ||
        form.dataset.state !== 'submitting'
      ) {
        return
      }

      showServiceError()
    }
  }

  form.addEventListener('submit', handleSubmit)
  input.addEventListener('input', handleCorrection)
  input.addEventListener('change', handleCorrection)

  form.noValidate = true
  form.dataset.enhanced = 'true'
  setState('idle')

  return () => {
    isActive = false
    requestGeneration += 1
    form.removeEventListener('submit', handleSubmit)
    input.removeEventListener('input', handleCorrection)
    input.removeEventListener('change', handleCorrection)
    restoreControls()
    form.noValidate = false
    delete form.dataset.enhanced
  }
}
