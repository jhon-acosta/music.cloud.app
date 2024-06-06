import axios from 'axios'
import { useUtilidades } from '@/assets/utils'
import AudioPlayer from 'react-h5-audio-player'
import { useEffect, useRef, useState } from 'react'
import { Cancion, NextPageWithLayout } from '@/types/global'
import { Card, Typography, List, Avatar, Button } from 'antd'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons'

const Inicio: NextPageWithLayout = () => {
  const { setError } = useUtilidades()

  const reproductor = useRef<AudioPlayer>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canciones, setCanciones] = useState<Cancion[]>([])
  const [cancionActual, setCancionActual] = useState<
    (Cancion & { paused?: boolean }) | null
  >(null)

  const getCanciones = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get<{ data: Cancion[] }>('/api/pg-rds')
      setCanciones(data.data)
      reproductor.current?.audio.current?.pause()
      setCancionActual({ ...data.data[0], paused: true })
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCanciones()
  }, [])

  return (
    <div className="flex items-center justify-center !h-screen">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-5 w-full md:w-2/4">
        <Card
          title={
            <>
              Music Cloud <CustomerServiceOutlined />
            </>
          }
          loading={isLoading}
        >
          <List
            dataSource={canciones}
            renderItem={(item) => (
              <List.Item key={item.nombre}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      className={
                        cancionActual?.id === item.id && !cancionActual.paused
                          ? 'animate-spin'
                          : ''
                      }
                      src="https://w7.pngwing.com/pngs/710/955/png-transparent-vinyl-record-artwork-phonograph-record-compact-disc-lp-record-disc-jockey-symbol-miscellaneous-classical-music-sound.png"
                    />
                  }
                  title={
                    <Typography.Link
                      className={
                        cancionActual?.id === item.id ? '!text-green-500' : ''
                      }
                      onClick={() =>
                        setCancionActual({ ...item, paused: false })
                      }
                    >
                      {item.nombre}
                    </Typography.Link>
                  }
                  description={item.artista + ' | ' + item.album}
                />
                <Typography.Text type="secondary">
                  {!cancionActual?.paused && cancionActual?.id === item.id ? (
                    <Button
                      type="primary"
                      icon={<PauseCircleOutlined />}
                      onClick={() => {
                        setCancionActual({ ...item, paused: true })
                        reproductor.current?.audio.current?.pause()
                      }}
                    />
                  ) : (
                    <Button
                      type={
                        cancionActual?.paused && cancionActual?.id === item.id
                          ? 'primary'
                          : 'default'
                      }
                      icon={<PlayCircleOutlined />}
                      onClick={() => {
                        setCancionActual({ ...item, paused: false })
                        reproductor.current?.audio.current?.play()
                      }}
                    />
                  )}
                </Typography.Text>
              </List.Item>
            )}
          />
        </Card>

        <Card loading={isLoading}>
          <AudioPlayer
            ref={reproductor}
            src={cancionActual?.ruta}
            footer={cancionActual?.artista}
            header={cancionActual?.nombre}
            onPlay={
              cancionActual
                ? () => setCancionActual({ ...cancionActual, paused: false })
                : undefined
            }
            onPause={
              cancionActual
                ? () => setCancionActual({ ...cancionActual, paused: true })
                : undefined
            }
            onClickNext={() => {
              if (!cancionActual) return
              const cancionSiguiente = canciones.find(
                (c) => c.id === cancionActual?.id + 1
              )
              if (!cancionSiguiente) return
              setCancionActual({ ...cancionSiguiente, paused: false })
            }}
            onClickPrevious={() => {
              if (!cancionActual) return
              const cancionAnterior = canciones.find(
                (c) => c.id === cancionActual?.id - 1
              )
              if (!cancionAnterior) return
              setCancionActual({ ...cancionAnterior, paused: false })
            }}
            showJumpControls={false}
            showSkipControls
            autoPlayAfterSrcChange
          />
        </Card>
      </div>
    </div>
  )
}

export default Inicio
