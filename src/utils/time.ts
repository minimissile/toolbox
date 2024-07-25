import { DateTime } from 'luxon'

/**
 * 获取指定时区的偏移量
 * @param timeZone 时区（例如 'America/New_York'）
 * @returns 时区偏移（如 '-04:00'）
 */
function timeZoneOffset(timeZone: string): string {
  const now = new Date()
  const offset = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    .formatToParts(now)
    .find((part) => part.type === 'timeZoneName')?.value

  // 将时区偏移转换为 ISO 格式（如 '-04:00'）
  return offset ? (offset.includes('GMT') ? offset.replace('GMT', '') : offset) : ''
}

/**
 * 将格式化的时间字符串和时区转换为时间戳
 * @param formattedTime 格式化的时间字符串（例如 '2024-07-25 11:16:33'）
 * @param timeZone 时区（例如 'Asia/Shanghai'）
 * @returns 时间戳（以毫秒为单位）
 */
export function parseToTimestamp(formattedTime: string, timeZone: string): number {
  // 解析时间字符串为 DateTime 对象
  const [datePart, timePart] = formattedTime.split(' ')

  // 构建完整的日期时间字符串
  const dateTimeStr = `${datePart}T${timePart}`

  // 使用 luxon 解析日期时间字符串，并指定时区
  const dateTime = DateTime.fromISO(dateTimeStr, { zone: timeZone })

  if (!dateTime.isValid) {
    throw new Error('Invalid date/time format or timezone')
  }

  return dateTime.toMillis()
}

/**
 * 将时间戳和时区转换为格式化的时间
 * @param timestamp 时间戳（以毫秒为单位）
 * @param timeZone 时区（例如 'America/New_York', 'Asia/Shanghai'）
 * @param format 时间格式（'YYYY-MM-DD HH:mm:ss', 'MM/dd/yyyy, hh:mm:ss a'）
 * @returns 格式化后的时间字符串
 */
export function formatToTimestamp(timestamp: number, timeZone: string, format: string): string {
  const date = new Date(timestamp)

  // 创建 Intl.DateTimeFormat 对象用于日期部分
  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  // 创建 Intl.DateTimeFormat 对象用于时间部分
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: format !== 'YYYY-MM-DD HH:mm:ss', // 使用 12 小时制
  })

  // 处理格式
  if (format === 'YYYY-MM-DD HH:mm:ss') {
    const parts: Record<string, any> = {
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '',
      second: '',
    }

    dateFormatter.formatToParts(date).forEach((part) => {
      if (part.type in parts) {
        parts[part.type] = part.value
      }
    })

    timeFormatter.formatToParts(date).forEach((part) => {
      if (part.type in parts) {
        parts[part.type] = part.value
      }
    })

    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`
  } else if (format === 'MM/dd/yyyy, hh:mm:ss a') {
    const parts: Record<string, any> = {
      year: '',
      month: '',
      day: '',
      hour: '',
      hour12: '',
      minute: '',
      second: '',
      dayPeriod: '',
    }

    dateFormatter.formatToParts(date).forEach((part) => {
      if (part.type in parts) {
        parts[part.type] = part.value
      }
    })

    timeFormatter.formatToParts(date).forEach((part) => {
      if (part.type in parts) {
        parts[part.type] = part.value
      }
    })
    return `${parts.month}/${parts.day}/${parts.year}, ${parts.hour}:${parts.minute}:${parts.second} ${parts.dayPeriod}`
  }

  // 默认返回空字符串
  return ''
}

/**
 * 获取当前地区的时区
 * @returns 当前时区
 */
export function getCurrentTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
