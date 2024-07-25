import { Button, Flex, Image, Heading, useColorMode, Container } from '@chakra-ui/react'

const Header = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Flex as={'header'} h={'80px'} align={'center'} border={'1px solid rgba(255,255,255,0.1)'}>
      <Container as={Flex} justifyContent={'space-between'} alignItems={'center'}>
        <Flex align={'center'}>
          <Image w={'40px'} mr={'10px'} src={'/logo.png'}></Image>
          <Heading fontSize={'18px'}>Geek Tools</Heading>
        </Flex>

        <Flex onClick={toggleColorMode}>
          <Button>切换主题</Button>
        </Flex>
      </Container>
    </Flex>
  )
}

export default Header
