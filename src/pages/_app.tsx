import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { fonts } from '@/lib/fonts'
import { theme } from '@/theme'
import Layout from './_layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${fonts.rubik.style.fontFamily};
          }
        `}
      </style>
      <ChakraBaseProvider
        theme={theme}
        toastOptions={{
          defaultOptions: {
            position: 'top',
            duration: 2000,
            isClosable: true,
          },
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraBaseProvider>
    </>
  )
}
