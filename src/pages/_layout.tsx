import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
