const obtenerEntornos = () => ({
  PG_HOST: process.env.NEXT_PUBLIC_PG_HOST || '',
  PG_PORT: process.env.NEXT_PUBLIC_PG_PORT || '',
  PG_DB: process.env.NEXT_PUBLIC_PG_DB || '',
  PG_USER: process.env.NEXT_PUBLIC_PG_USER || '',
  PG_PASS: process.env.NEXT_PUBLIC_PG_PASS || '',
})

export const configs = obtenerEntornos()
