import { Button, Flex, useColorMode } from '@chakra-ui/react'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex onClick={toggleColorMode}>
      <Button>切换主题{colorMode === 'light' ? 'Dark' : 'Light'}</Button>
    </Flex>
  )
}

export default Header
