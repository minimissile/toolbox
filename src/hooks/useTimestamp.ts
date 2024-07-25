import React, { useEffect, useState } from 'react'
import { getCurrentTimeZone } from '@/utils/time'

const currentTimeZone = getCurrentTimeZone()

/**
 * 时间戳
 */
const useTimestamp = () => {
  // 要转换的时间戳
  const [timestamp, setTimestamp] = useState<string>('')
  // 选中的时区
  const [timeZone, setTimeZone] = useState<string>(currentTimeZone)
  // 时间单位
  const [unit, setUnit] = useState<string>('ms')
  // 时间格式
  const [format, setFormat] = useState<string>('YYYY-MM-DD HH:mm:ss')
  // 格式化的时间戳
  const [formatTimestamp, setFormatTimestamp] = useState<string>('')

  const onChangeTimestamp = (value: string) => {
    setTimestamp(value)
    if (value.length === 13) {
      setUnit('ms')
    } else if (value.length === 10) {
      setUnit('s')
    }
  }

  /**
   * 选择时间单位
   * @param event
   */
  const onChangeUnit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value
    setUnit(val)
    if (val === 's' && timestamp.length === 13) {
      setTimestamp((Number(timestamp) / 1000).toFixed(0).toString())
    }
  }

  /**
   * 选择时区
   * @param event
   */
  const onChangeTimeZone = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(event.target.value)
  }

  /**
   * 选择时区
   * @param event
   */
  const onChangeFormat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value)
  }

  return {
    timestamp,
    timeZone,
    unit,
    format,
    setFormatTimestamp,
    setUnit,
    setTimestamp,
    formatTimestamp,
    onChangeTimeZone,
    onChangeUnit,
    onChangeFormat,
    onChangeTimestamp,
  }
}

export default useTimestamp
