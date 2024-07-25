import { extendTheme, theme as chakraTheme } from '@chakra-ui/react'

const { Button } = chakraTheme.components

export const theme = extendTheme({
  components: {
    Container: {
      baseStyle: {
        maxW: '1440px', // 版心宽度
        px: 4,
      },
    },
    Button: {
      ...Button,
      baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 'md',
      },
    },
    Input: {},
    Toast: {
      baseStyle: {
        duration: 3000,
        position: 'top',
        isClosable: true,
      },
    },
  },
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
})
