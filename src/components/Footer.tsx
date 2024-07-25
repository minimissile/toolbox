import { Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex as={'footer'} h={'80px'} alignItems={'center'} justifyContent={'center'} flexShrink={0}>
      <Text as={'p'} fontSize={'14px'} color={'#aaa'}>
        © Geek Tools 2024. All rights reserved
      </Text>
    </Flex>
  )
}

export default Footer
