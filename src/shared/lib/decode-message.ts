export type MessageCodes = keyof typeof MESSAGE_CODES

const MESSAGE_CODES = {
  EMAIL_NOT_FOUND: 'The user with this email was not found',
  INVALID_PASSWORD: 'Invalid password',
  AUTH: 'Please, log in',
}

export const decodeMessage = (code: MessageCodes): string =>
  MESSAGE_CODES[code] ? MESSAGE_CODES[code] : 'Unknown error!'
