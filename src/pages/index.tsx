import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { Box, Container, Flex, Text } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Geek Tools | 一站式解决方案，提供各种实用小工具，助你轻松搞定日常任务。</title>
        <meta name="description" content="Geek Tools | 一站式解决方案，提供各种实用小工具，助你轻松搞定日常任务。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={`${inter.className}`} h={'100%'}>
        <Flex gap={'20px'} pt={'20px'}>
          <Box
            fontWeight={600}
            as={Link}
            href={'/timestamp'}
            boxShadow={'-10px 10px 10px 5px rgba(1,1,1,0.2)'}
            w={'20%'}
            h={'100px'}
            p={6}
          >
            <Text>时间戳</Text>
          </Box>

          <Box as={Link} href={'/uuid'} boxShadow={'-10px 10px 10px 5px rgba(1,1,1,0.2)'} w={'20%'} h={'100px'} p={6}>
            <Text fontWeight={600}>UUID</Text>
          </Box>
        </Flex>
      </Container>
    </>
  )
}
