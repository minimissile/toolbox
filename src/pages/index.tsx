import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Box, BoxProps, Container, Flex, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Geek Tools | 一站式解决方案，提供各种实用小工具，助你轻松搞定日常任务。</title>
        <meta name="description" content="Geek Tools | 一站式解决方案，提供各种实用小工具，助你轻松搞定日常任务。" />
      </Head>

      <Container h={'100%'}>
        <Flex gap={'20px'} pt={'20px'}>
          <Card title={'时间戳转换工具'} link={'/timestamp'} />
          <Card title={'UUID生成器'} link={'/uuid'} />
          <Card title={'以太坊靓号生成器'} link={'/rareeth'} />
          <Card title={'摩斯密码转换器'} link={'/morse'} />
          <Card title={'人民币大写转换器'} link={'/rmb'} />
        </Flex>
      </Container>
    </>
  )
}

// 摩斯密码转换器

interface CardProps extends BoxProps {
  title: string
  link: string
}

const Card: React.FC<CardProps> = ({ title, link, ...other }) => {
  return (
    <Box
      as={Link}
      href={link}
      boxShadow={'rgba(0, 0, 0, 0.1) -10px -10px 10px 7px'}
      _hover={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 0px',
      }}
      w={'20%'}
      h={'100px'}
      p={6}
      {...other}
    >
      <Text fontWeight={600}>{title}</Text>
    </Box>
  )
}
