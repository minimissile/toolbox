import { NextSeo } from 'next-seo'
import { NextPage } from 'next'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { Button, Input, Flex, Container, Heading, Text, Select, useToast } from '@chakra-ui/react'
import { formatToTimestamp, getCurrentTimeZone, parseToTimestamp } from '@/utils/time'
import timezones from '@/assets/data/timezones.json'

const currentTimeZone = getCurrentTimeZone()

/**
 * 时间戳工具
 * @constructor
 */
const Timestamp: NextPage = () => {
  const toast = useToast()
  // 当前时间戳
  const [currentTimestamp, setCurrentTimestamp] = useState<number>()
  // 要转换的时间戳
  const [timestamp, setTimestamp] = useState<string>('')
  // 格式化的时间戳
  const [formatTimestamp, setFormatTimestamp] = useState<string>('')
  // 选中的时区
  const [timeZone, setTimeZone] = useState<string>(currentTimeZone)
  // 时间单位
  const [unit, setUnit] = useState<string>('ms')
  // 时间格式
  const [format, setFormat] = useState<string>('YYYY-MM-DD HH:mm:ss')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)

    // 清除定时器
    return () => clearInterval(intervalId)
  }, [])

  const handleTimestamp = () => {
    if (currentTimestamp) {
      setTimestamp(currentTimestamp.toString())
      setUnit('ms')
    }
  }

  const changeTimestamp = (value: string) => {
    setTimestamp(value)
    if (value.length === 13) {
      setUnit('ms')
    } else if (value.length === 10) {
      setUnit('s')
    }
  }

  /**
   * 点击转换
   */
  const handleConversion = () => {
    if (!timestamp) {
      toast({
        description: '时间戳格式不正确',
        status: 'warning',
      })
      return
    }

    const timestampValue = unit === 'ms' ? Number(timestamp) : Number(timestamp) * 1000
    const formattedTime = formatToTimestamp(timestampValue, timeZone, format)
    setFormatTimestamp(formattedTime)
  }

  /**
   * 选择时区
   * @param event
   */
  const handleTimeZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeZone(event.target.value)
  }

  /**
   * 选择时区
   * @param event
   */
  const handleFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(event.target.value)
  }

  /**
   * 选择时间单位
   * @param event
   */
  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val = event.target.value
    setUnit(val)
    if (val === 's' && timestamp.length === 13) {
      setTimestamp((Number(timestamp) / 1000).toFixed(0).toString())
    }
  }

  return (
    <>
      <Header />
      <PageSeo />
      <Container w={'100%'}>
        <Heading as={'h2'} py={'20px'} fontSize={'20px'}>
          时间戳工具
        </Heading>

        {/*当前时间戳*/}
        <Flex gap={'10px'} mb={5}>
          <Text>现在</Text>
          <Text
            cursor={'pointer'}
            onClick={handleTimestamp}
            transition={'all 0.3s ease'}
            _hover={{ textDecoration: 'underline' }}
          >
            {currentTimestamp}
          </Text>
        </Flex>

        {/*时间戳格式转换*/}
        <Flex gap={'10px'} align={'center'}>
          <Text flexShrink={0}>时间戳</Text>
          <Input
            type={'number'}
            value={timestamp}
            onChange={(event) => changeTimestamp(event.target.value)}
            placeholder={'请输入时间戳'}
          ></Input>

          {/*时间单位*/}
          <Select value={unit} onChange={handleUnitChange}>
            <option value="ms">毫秒(ms)</option>
            <option value="s">秒(s)</option>
          </Select>

          {/*时区*/}
          <Select value={timeZone} onChange={handleTimeZoneChange}>
            {timezones.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              )
            })}
          </Select>

          {/*格式化*/}
          <Select value={format} onChange={handleFormatChange}>
            <option value={'YYYY-MM-DD HH:mm:ss'}>YYYY-MM-DD HH:mm:ss</option>
            <option value={'MM/dd/yyyy, hh:mm:ss a'}>MM/dd/yyyy, hh:mm:ss a</option>
          </Select>

          <Button flexShrink={0} px={'25px'} onClick={handleConversion}>
            转换
          </Button>

          {/*转换后的时间格式*/}
          <Input isReadOnly={true} value={formatTimestamp} placeholder={'转换后的时间格式'}></Input>
        </Flex>
      </Container>
    </>
  )
}

const PageSeo = () => {
  return (
    <NextSeo
      title="时间戳(Unix timestamp)转换工具 - 在线工具"
      description="Unix时间戳转换可以把Unix时间转成北京时间"
      canonical="https://www.yourwebsite.com/"
      openGraph={{
        url: 'https://www.yourwebsite.com/',
        title: 'Open Graph Title',
        description: 'Open Graph Description',
        images: [
          {
            url: 'https://www.yourwebsite.com/og-image.jpg',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
        ],
        site_name: 'SiteName',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  )
}

export default Timestamp
