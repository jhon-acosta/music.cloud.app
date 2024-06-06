import { Pool } from 'pg'
import { configs } from './enviroments'

const pgRDS = new Pool({
  host: configs.PG_HOST,
  port: parseInt(configs.PG_PORT),
  database: configs.PG_DB,
  user: configs.PG_USER,
  password: configs.PG_PASS,
  ssl: { rejectUnauthorized: false },
})

export default pgRDS
