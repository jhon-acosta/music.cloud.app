import { Layout } from 'antd'
import React, { FC, PropsWithChildren } from 'react'

const PublicLayout: FC<PropsWithChildren> = (props) => {
  return (
    <Layout>
      <Layout.Content className="!min-h-screen mx-5">
        <Layout.Content>{props.children}</Layout.Content>
      </Layout.Content>
    </Layout>
  )
}

export default PublicLayout
