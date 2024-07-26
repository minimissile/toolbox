/**
 * 将人民币小写金额转换为大写金额
 * @param amount 金额（以小数形式表示，例如 1500 或 1.5）
 * @returns 大写金额
 */
export function convertToChinese(amount: number): string {
  // 定义数字到大写的映射
  const digitMap = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const unitMap = ['', '拾', '佰', '仟']
  const sectionMap = ['', '万', '亿', '兆']

  // 处理金额
  const [integerPart, decimalPart = ''] = amount.toFixed(2).split('.')
  let result = ''

  // 处理整数部分
  let integerValue = parseInt(integerPart, 10)
  if (integerValue === 0) {
    result = '零元'
  } else {
    let integerString = ''
    let sectionIndex = 0
    let zeroFlag = false

    // 分段处理整数部分
    while (integerValue > 0) {
      let section = integerValue % 10000
      if (section > 0) {
        let sectionString = ''
        let sectionValue = section
        let unitIndex = 0

        // 处理每一段的值
        while (sectionValue > 0) {
          const digit = sectionValue % 10
          if (digit > 0) {
            sectionString = digitMap[digit] + unitMap[unitIndex] + sectionString
          } else if (!zeroFlag) {
            sectionString = digitMap[0] + sectionString
          }
          zeroFlag = digit === 0
          sectionValue = Math.floor(sectionValue / 10)
          unitIndex++
        }

        // 添加段单位
        sectionString += sectionMap[sectionIndex]
        integerString = sectionString + integerString
      }
      integerValue = Math.floor(integerValue / 10000)
      sectionIndex++
    }

    // 处理元单位
    result = integerString + '元'
  }

  // 处理小数部分
  if (decimalPart.length > 0) {
    const [jiao, fen] = decimalPart.split('')
    if (parseInt(jiao, 10) > 0) {
      result += digitMap[parseInt(jiao, 10)] + '角'
    } else if (parseInt(fen, 10) > 0) {
      result += '零'
    }
    if (parseInt(fen, 10) > 0) {
      result += digitMap[parseInt(fen, 10)] + '分'
    }
  } else {
    result += '整'
  }

  return result
}
