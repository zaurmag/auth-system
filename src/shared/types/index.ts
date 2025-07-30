export const enum EMessageType {
  INFO = 'info',
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export interface IMessage {
  type: EMessageType
  value: string
  timeout?: number
}

export const enum ELayout {
  EMPTY = 'empty',
  COMMON = 'common',
}
