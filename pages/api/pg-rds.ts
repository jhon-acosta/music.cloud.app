import pgRDS from '@/assets/configs/db'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  switch (request.method) {
    case 'GET':
      pgRDS.query('SELECT * FROM canciones', (err, res) => {
        if (err) throw err
        return response.status(200).json({ data: res.rows })
      })
  }
}
