import esEs from 'antd/locale/es_ES'
import { App, ConfigProvider } from 'antd'
import PublicLayout from '@/components/PublicLayout'

import 'antd/dist/reset.css'
import '../assets/styles/globals.css'
import 'react-h5-audio-player/lib/styles.css'

import { AppPropsWithLayout } from '@/types/global'

const colorPrimary = '#1ED760'

const BuenaVistaApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const Layout = PublicLayout

  return (
    <>
      <ConfigProvider
        locale={esEs}
        theme={{
          token: {
            colorPrimary,
            colorLink: colorPrimary,
            colorLinkHover: colorPrimary,
            colorBgLayout: '#000000',
            borderRadius: 25,
          },
        }}
      >
        <App>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </App>
      </ConfigProvider>
    </>
  )
}

export default BuenaVistaApp
