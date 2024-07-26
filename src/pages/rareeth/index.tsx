import { Box, Container, Heading, Flex, Text, Input, Button, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ethers } from 'ethers'
import { NextSeo } from 'next-seo'

const Rareeth = () => {
  const [prefix, setPrefix] = useState<string>('')
  const [suffix, setSuffix] = useState<string>('')
  const [matchingWallet, setMatchingWallet] = useState<any>(null)
  const [generatedAddresses, setGeneratedAddresses] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  const toast = useToast()

  /**
   * 生成以太坊地址
   */
  const generateAddress = () => {
    setIsGenerating(true)
    const interval = setInterval(() => {
      try {
        // 生成一个新的钱包
        const wallet = ethers.Wallet.createRandom()

        // 生成地址
        const address = wallet.address

        // 更新生成的地址列表
        setGeneratedAddresses((prev) => [...prev, address])

        // 检查是否符合规则
        if (
          address.toUpperCase().startsWith(prefix.toUpperCase()) &&
          address.toUpperCase().endsWith(suffix.toUpperCase())
        ) {
          // 找到符合规则的地址
          setMatchingWallet({
            address,
            privateKey: wallet.privateKey,
          })

          clearInterval(interval) // 结束生成过程
          setIsGenerating(false)
          toast({
            title: '找到符合规则的地址',
            description: `地址: ${address}`,
            status: 'success',
          })
        }
      } catch (error) {
        // 处理错误
        toast({
          title: '地址生成失败',
          description: '生成以太坊地址时出现错误。',
          status: 'error',
        })
        clearInterval(interval)
        setIsGenerating(false)
      }
    }, 0) // 每秒生成一个新地址
  }

  return (
    <>
      <NextSeo title="以太坊靓号生成器" />
      <Box>
        <Container pt={'40px'}>
          <Heading as={'h2'} mb={'30px'} fontSize={'20px'}>
            以太坊靓号生成器
          </Heading>

          <Flex direction={'column'} mb={'20px'}>
            <Text mb={'10px'}>前缀</Text>
            <Input
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              placeholder={'请输入前缀（最多 10 个字符）'}
              mb={'20px'}
            />
            <Text mb={'10px'}>后缀</Text>
            <Input
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
              placeholder={'请输入后缀（最多 10 个字符）'}
            />
          </Flex>

          <Button px={'20px'} onClick={generateAddress} isDisabled={isGenerating}>
            {isGenerating ? '生成中...' : '生成'}
          </Button>

          <Flex direction={'column'} mt={'20px'}>
            <Text mb={'10px'}>生成的地址</Text>
            <Textarea value={generatedAddresses.join('\n')} placeholder={'生成的以太坊地址'} readOnly rows={10} />
          </Flex>

          {matchingWallet && (
            <Flex direction={'column'} mt={'20px'}>
              <Text mb={'10px'}>符合规则的钱包信息</Text>
              <Text>地址: {matchingWallet.address}</Text>
              <Text>私钥: {matchingWallet.privateKey}</Text>
            </Flex>
          )}
        </Container>
      </Box>
    </>
  )
}

export default Rareeth
