import { NextSeo } from 'next-seo'
import { NextPage } from 'next'

/**
 * 时间戳工具
 * @constructor
 */
const Timestamp: NextPage = () => {
  return (
    <>
      <NextSeo
        title="时间戳"
        description="Your page description"
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
      <p>时间戳工具</p>
    </>
  )
}

export default Timestamp
