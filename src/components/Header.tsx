import { Flex, Image, Heading, Container } from '@chakra-ui/react'
import Link from 'next/link'

const Header = () => {
  return (
    <Flex
      w={'100%'}
      as={'header'}
      h={'80px'}
      align={'center'}
      border={'1px solid rgba(255,255,255,0.1)'}
      flexShrink={0}
      // position={'fixed'}
      // bg={'#1A202C'}
    >
      <Container as={Flex} justifyContent={'space-between'} alignItems={'center'}>
        <Link href={'/'}>
          <Flex align={'center'}>
            <Image w={'40px'} mr={'10px'} src={'/logo.png'} alt={'logo'}></Image>
            <Heading fontSize={'22px'}>Geek Tools</Heading>
          </Flex>
        </Link>
      </Container>
    </Flex>
  )
}

export default Header
