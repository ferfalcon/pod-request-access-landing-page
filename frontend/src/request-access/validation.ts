export type EmailValidationResult =
  | {
      isValid: true
      normalizedEmail: string
    }
  | {
      isValid: false
      normalizedEmail: string
    }

export function validateEmail(value: string): EmailValidationResult {
  const normalizedEmail = value.trim()
  const probe = document.createElement('input')

  probe.type = 'email'
  probe.required = true
  probe.value = normalizedEmail

  if (probe.checkValidity()) {
    return {
      isValid: true,
      normalizedEmail,
    }
  }

  return {
    isValid: false,
    normalizedEmail,
  }
}
