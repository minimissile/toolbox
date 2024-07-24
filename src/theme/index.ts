import { extendTheme, type ThemeConfig, theme as chakraTheme } from '@chakra-ui/react'

const { Button } = chakraTheme.components

export const theme = extendTheme({
  components: {
    Button,
  },
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
})
