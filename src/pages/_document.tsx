import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript } from 'next/document'
import { theme } from '@/theme'
import React from 'react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="og:title" content="TSDX: Modern TypeScript Package Development" />
        <meta name="og:url" content="https://tsdx.io" />
        <meta name="og:image" content="https://tsdx.io/og_image.jpg" />

        <meta property="og:title" content="Your Page Title" />
        <meta property="og:description" content="Get rewarded with the most Telegram-native memecoin" />
        <meta property="og:image" content="https://tsdx.io/og_image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
