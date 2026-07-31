import { describe, expect, it } from 'vitest'
import { validateEmail } from './validation.ts'

describe('validateEmail', () => {
  it.each([
    '',
    '   ',
    'not-an-email',
    'john#mail.com',
    'two@example.com,three@example.com',
  ])('rejects %j using native single-email semantics', (value) => {
    expect(validateEmail(value).isValid).toBe(false)
  })

  it('accepts a standard address and trims surrounding whitespace', () => {
    expect(validateEmail('  person@example.com  ')).toEqual({
      isValid: true,
      normalizedEmail: 'person@example.com',
    })
  })
})
