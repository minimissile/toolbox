import { NextSeo } from 'next-seo'
import { NextPage } from 'next'
import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { formatToTimestamp, parseToTimestamp } from '@/utils/time'
import timezones from '@/assets/data/timezones.json'
import useTimestamp from '@/hooks/useTimestamp'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BaseDesc, BaseTitle } from '@/components/base'
import CodeDisplay from '@/components/CodeDisplay'
import { v4 as uuidv4 } from 'uuid'
import {
  Box,
  Button,
  Input,
  Flex,
  Container,
  Heading,
  Text,
  Select,
  Center,
  useToast,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'

/**
 * 时间戳工具
 * @constructor
 */
const Timestamp: NextPage = () => {
  const codes = [
    {
      language: 'Swift',
      codes: ['NSDate().timeIntervalSince1970'],
    },
    {
      language: 'Go',
      codes: ['import ("time")\n' + 'int64(time.Now().Unix())'],
    },
    {
      language: 'Java',
      codes: [
        '// pure java\n' + 'System.currentTimeMillis() / 1000',
        '// joda java\n' + 'DateTime.now().getMillis() / 1000',
        '// java >= 8\n' + 'Instant.now().getEpochSecond()',
      ],
    },
    {
      language: 'Go',
      codes: [
        '#include <sys/time.h>\n' +
          '// ...\n' +
          'struct timeval tv;\n' +
          'gettimeofday(&tv, NULL);\n' +
          '// 秒： tv.tv_sec\n' +
          '// 毫秒： tv.tv_sec * 1000LL + tv.tv_usec / 1000',
      ],
    },
    {
      language: 'JavaScript',
      codes: ['Math.round(new Date() / 1000)'],
    },
    {
      language: 'Objective-C',
      codes: ['[[NSDate date] timeIntervalSince1970]'],
    },
    {
      language: 'MySQL',
      codes: ['SELECT unix_timestamp(now())'],
    },
    {
      language: 'SQLite',
      codes: ["SELECT strftime('%s', 'now')"],
    },
    {
      language: 'Erlang',
      codes: ['calendar:datetime_to_gregorian_seconds(calendar:universal_time())-719528*24*3600.'],
    },
    {
      language: 'PHP',
      codes: [
        '<?php\n' + '// pure php\n' + 'time();',
        '<?php\n' + '// carbon php\n' + 'use CarbonCarbon;\n' + 'Carbon::now()->timestamp;',
      ],
    },
    {
      language: 'Python',
      codes: ['import time\n' + 'time.time()', 'import arrow\n' + 'arrow.utcnow().timestamp'],
    },
    {
      language: 'Ruby',
      codes: ['Time.now.to_i'],
    },
    {
      language: 'Shell',
      codes: ['date +%s'],
    },
    {
      language: 'Groovy',
      codes: ['(new Date().time / 1000).longValue()'],
    },
    {
      language: 'Lua',
      codes: ['os.time()'],
    },
    {
      language: '.NET/C#',
      codes: ['DateTimeOffset.UtcNow.ToUnixTimeSeconds();'],
    },
    {
      language: 'Dart',
      codes: ['(new DateTime.now().millisecondsSinceEpoch / 1000).truncate()'],
    },
  ]

  return (
    <Box>
      <PageSeo />
      <Container w={'100%'} pb={'100px'} pt={'40px'}>
        <Heading as={'h2'} mb={'30px'} fontSize={'20px'}>
          时间戳工具
        </Heading>

        {/*时间戳 转 格式*/}
        <TimestampToFormat />

        {/*格式 转 时间戳*/}
        <FormatToTimestamp />

        <BaseTitle mt={'100px'}>什么是unix时间戳？</BaseTitle>
        <BaseDesc mt={'15px'}>
          时间戳，是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数（不考虑闰秒），用于表示一个时间点。然而，这种格式对于人类阅读并不友好，因此需要转换成可读的日期和时间格式。这个工具能够将时间戳快速转换为人类可读的日期时间格式，同时也支持反向转换，即将日期时间转换为时间戳。
        </BaseDesc>

        <BaseTitle mt={'30px'}>2038 年 1 月 19 日会发生什么？</BaseTitle>
        <BaseDesc mt={'15px'}>
          在这一天，Unix 时间戳将因 32 位溢出而停止工作。在此之前，数百万应用程序将需要采用新的时间戳约定或迁移到 64
          位系统，这将为时间戳多争取“一点”时间。
        </BaseDesc>

        <BaseTitle mt={'100px'} mb={'20px'}>
          各种语言如何获取当前时间戳?
        </BaseTitle>

        {codes.map((item) => {
          return (
            <Flex mb={'30px'} key={item.language}>
              <Text mr={'20px'} py={'2px'} minW={'80px'} lineHeight={'44px'} fontSize={'14px'}>
                {item.language}
              </Text>

              <Flex flexDirection={'column'} w={'100%'} gap={'10px'}>
                {item.codes.map((col) => {
                  return <CodeDisplay key={uuidv4()} code={col}></CodeDisplay>
                })}
              </Flex>
            </Flex>
          )
        })}
      </Container>
    </Box>
  )
}

const TimestampToFormat = () => {
  const toast = useToast()
  // 当前时间戳
  const [currentTimestamp, setCurrentTimestamp] = useState<number>()
  const {
    timestamp,
    timeZone,
    unit,
    format,
    formatTimestamp,
    setFormatTimestamp,
    setTimestamp,
    setUnit,
    onChangeTimestamp,
    onChangeUnit,
    onChangeFormat,
    onChangeTimeZone,
  } = useTimestamp()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimestamp(Date.now())
    }, 1000)

    // 清除定时器
    return () => clearInterval(intervalId)
  }, [])

  /**
   * 点击当前时间
   */
  const handleTimestamp = () => {
    if (currentTimestamp) {
      setTimestamp(currentTimestamp.toString())
      setUnit('ms')
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

    try {
      const timestampValue = unit === 'ms' ? Number(timestamp) : Number(timestamp) * 1000
      const formattedTime = formatToTimestamp(timestampValue, timeZone, format)
      setFormatTimestamp(formattedTime)
    } catch (e) {
      toast({
        description: '时间戳格式不正确',
        status: 'warning',
      })
    }
  }

  return (
    <>
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

      <Flex gap={'10px'} align={'center'}>
        <Center minW={'50px'}>
          <Text flexShrink={0}>时间戳</Text>
        </Center>
        <Input
          maxW={'230px'}
          type={'number'}
          value={timestamp}
          onChange={(event) => onChangeTimestamp(event.target.value)}
          placeholder={'请输入时间戳'}
        ></Input>

        {/*时间单位*/}
        <Select value={unit} onChange={onChangeUnit} maxW={'130px'}>
          <option value="ms">毫秒(ms)</option>
          <option value="s">秒(s)</option>
        </Select>

        {/*时区*/}
        <Select value={timeZone} onChange={onChangeTimeZone}>
          {timezones.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            )
          })}
        </Select>

        {/*格式化*/}
        <Select value={format} onChange={onChangeFormat}>
          <option value={'YYYY-MM-DD HH:mm:ss'}>YYYY-MM-DD HH:mm:ss</option>
          <option value={'MM/dd/yyyy, hh:mm:ss a'}>MM/dd/yyyy, hh:mm:ss a</option>
        </Select>

        <Button flexShrink={0} px={'25px'} onClick={handleConversion}>
          转换
        </Button>

        {/*转换后的时间格式*/}
        <InputGroup size="md">
          <Input isReadOnly={true} value={formatTimestamp} placeholder={'转换后的时间格式'}></Input>
          <InputRightElement width="4.5rem">
            <CopyToClipboard text={formatTimestamp} onCopy={() => toast({ title: '已复制', status: 'success' })}>
              <Button size="sm" fontSize={'12px'} mr={'-8px'}>
                copy
              </Button>
            </CopyToClipboard>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </>
  )
}

/**
 * 格式 转 时间戳
 * @constructor
 */
const FormatToTimestamp = () => {
  const toast = useToast()
  const {
    timestamp,
    timeZone,
    unit,
    formatTimestamp,
    setFormatTimestamp,
    onChangeTimestamp,
    onChangeUnit,
    onChangeTimeZone,
  } = useTimestamp()

  /**
   * 点击转换
   */
  const handleConversion = () => {
    if (!formatTimestamp) {
      toast({
        description: '时间格式不正确',
        status: 'warning',
      })
      return
    }

    try {
      let timestamp = parseToTimestamp(formatTimestamp, timeZone)
      if (unit === 's') timestamp = timestamp / 1000
      onChangeTimestamp(timestamp.toString())
    } catch (e) {
      toast({
        description: '时间格式不正确',
        status: 'warning',
      })
    }
  }

  return (
    <Flex gap={'10px'} align={'center'} mt={'30px'}>
      <Center minW={'50px'}>
        <Text flexShrink={0}>时间</Text>
      </Center>

      <Input
        maxW={'230px'}
        value={formatTimestamp}
        onChange={(event) => setFormatTimestamp(event.target.value)}
        placeholder={'请输入时间格式'}
      ></Input>

      {/*时间单位*/}
      <Select value={unit} onChange={onChangeUnit} maxW={'130px'}>
        <option value="ms">毫秒(ms)</option>
        <option value="s">秒(s)</option>
      </Select>

      {/*时区*/}
      <Select value={timeZone} onChange={onChangeTimeZone}>
        {timezones.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          )
        })}
      </Select>

      <Button flexShrink={0} px={'25px'} onClick={handleConversion}>
        转换
      </Button>

      {/*转换后的时间格式*/}
      <InputGroup size="md">
        <Input isReadOnly={true} value={timestamp} placeholder={'转换后的时间戳'}></Input>
        <InputRightElement width="4.5rem">
          <CopyToClipboard text={timestamp} onCopy={() => toast({ title: '已复制', status: 'success' })}>
            <Button size="sm" fontSize={'12px'} mr={'-8px'}>
              copy
            </Button>
          </CopyToClipboard>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}

const PageSeo = () => {
  return (
    <NextSeo
      title="时间戳(Unix timestamp)转换工具 - 在线工具"
      description="Unix时间戳转换可以把Unix时间转成需要的时间"
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
        site_name: 'Geek Tools',
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
