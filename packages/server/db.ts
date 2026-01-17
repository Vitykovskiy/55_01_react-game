import { QueryTypes, Sequelize } from 'sequelize'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
  DB_HOST,
} = process.env

if (!POSTGRES_DB || !POSTGRES_USER) {
  throw new Error('Database credentials are not set')
}

export const sequelize = new Sequelize(
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  {
    host: DB_HOST || POSTGRES_HOST || 'localhost',
    port: Number(POSTGRES_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
)

export const connectToDatabase = async (): Promise<void> => {
  await sequelize.authenticate()
  const [result] = await sequelize.query<{ now: string }>(
    'SELECT NOW() as now',
    { type: QueryTypes.SELECT }
  )
  console.log('  ➜ 🎸 Connected to the database at:', result?.now)
}
