import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Home = () => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <NextSeo
        title="Your Page Title"
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
      <div>
        <p>首页</p>
        <p>Page: {slug}</p>
      </div>
    </>
  )
}

export default Home
