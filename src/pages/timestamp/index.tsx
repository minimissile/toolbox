import { NextSeo } from 'next-seo'
import { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import Header from '@/components/Header'

/**
 * 时间戳工具
 * @constructor
 */
const Timestamp: NextPage = () => {
  return (
    <>
      <Header />
      <PageSeo />
      <p>时间戳工具</p>
      <Button>时间戳工具修改主题2</Button>
    </>
  )
}

const PageSeo = () => {
  return (
    <NextSeo
      title="时间戳(Unix timestamp)转换工具 - 在线工具"
      description="Unix时间戳转换可以把Unix时间转成北京时间"
      canonical="https://www.yourwebsite.com/"
      openGraph={{
        url: 'https://www.yourwebsite.com/',
        title: 'Open Graph Title',
        description: 'Open Graph Description',
        images: [
          {
            url: 'https://www.yourwebsite.com/og-image.jpg',
            width: 800,
            height: 600,
            alt: 'Og Image Alt',
          },
        ],
        site_name: 'SiteName',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  )
}

export default Timestamp
