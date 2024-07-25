const json = require('./timezones.json')
const fs = require('fs')

const main = () => {
  // 提取并去重 UTC 数据
  const arr = new Set()
  for (let i of json) {
    const utcs = i['utc']
    utcs.forEach((p) => arr.add(p))
  }

  // 将 Set 转换为数组，并排序
  const sortedArr = Array.from(arr).sort()

  // 保存排序后的数组到文件
  fs.writeFileSync('./sorted_timezones.json', JSON.stringify(sortedArr, null, 2), 'utf-8')

  console.log('排序后的去重数据已保存到 sorted_timezones.json')
}

main()
