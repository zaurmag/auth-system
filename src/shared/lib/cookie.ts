/**
 * Устанавливает cookie с указанным именем, значением и сроком действия.
 * @param name Имя cookie.
 * @param value Значение cookie.
 * @param expired Время жизни cookie (в минутах).
 */
export const setCookie = (name: string, value: unknown, expired: number = 60): void => {
  const date = new Date()
  date.setTime(date.getTime() + expired * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`

  document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; ${expires}; path=/`
}

/**
 * Получает значение cookie с указанным именем.
 * @param name Имя cookie.
 * @returns Значение cookie или null, если cookie не найдено.
 */
export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split('; ')

  for (const cookie of cookies) {
    const [key, value] = cookie.split('=')
    if (key === name) {
      return JSON.parse(decodeURIComponent(value))
    }
  }

  return null
}

/**
 * Удаляет cookie по его имени.
 * @param name Имя cookie.
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
