import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  NumberInput,
  Textarea,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Button,
  useToast,
} from '@chakra-ui/react'
import { BaseDesc, BaseTitle } from '@/components/base'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { NextSeo } from 'next-seo'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Uuid = () => {
  const toast = useToast()
  const [generateNumber, setGenerateNumber] = useState<number>(1)
  const [uuids, setUuids] = useState<string>('')
  /**
   * 点击生成
   */
  const handleGenerate = () => {
    // 生成 UUID 数组
    const generatedUuids = Array.from({ length: generateNumber }, () => uuidv4())

    // 将 UUID 数组转换为以换行符分隔的字符串
    const uuidsString = generatedUuids.join('\n')

    // 更新状态
    setUuids(uuidsString)
  }

  const handleCopy = () => {
    if (uuids) {
      toast({
        title: '复制成功',
        status: 'success',
      })
    }
  }

  return (
    <>
      <PageSeo />
      <Box>
        <Container pt={'40px'}>
          <Heading as={'h2'} mb={'40px'} fontSize={'20px'}>
            UUID生成器
          </Heading>

          <Flex mb={'30px'} align={'center'}>
            <Text mr={'20px'}>数量</Text>
            <NumberInput
              value={generateNumber}
              min={1}
              max={100}
              mr={'10px'}
              onChange={(value) => {
                setGenerateNumber(Number(value))
              }}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button px={'25px'} onClick={handleGenerate} mr={'10px'}>
              生成
            </Button>
            <CopyToClipboard text={uuids} onCopy={handleCopy}>
              <Button px={'25px'} variant="outline">
                复制
              </Button>
            </CopyToClipboard>
          </Flex>

          <Textarea value={uuids} placeholder="生成的 UUID 将显示在这里" readOnly rows={10} />

          <BaseTitle mt={'100px'}>简介</BaseTitle>
          <BaseDesc mt={'20px'}>
            UUID，全称为通用唯一识别码（Universally Unique
            Identifier），是一种标准化的标识符。它在计算机系统中广泛应用，用于唯一标识对象、实体或信息。UUID由128位数字组成，通常以32个十六进制数字的形式表示，中间使用连字符进行分隔。
          </BaseDesc>
        </Container>
      </Box>
    </>
  )
}

const PageSeo = () => {
  return (
    <NextSeo
      title="uuid生成器 - 在线工具"
      description="uuid生成器，批量uuid生成"
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

export default Uuid
