import { FC } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: FC
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// index.tsx
export interface Cancion {
  id: number
  nombre: string
  artista: string
  album: string
  ruta: string
}
