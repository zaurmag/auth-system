const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'The user with this email was not found',
  INVALID_PASSWORD: 'Invalid password',
  auth: 'Please log in'
}

export function error (code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Unknown error!'
}
