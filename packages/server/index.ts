import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import session from 'express-session'
import { connectToDatabase, sequelize } from './db'
import { requireAuth } from './middleware/auth'
import { initModels } from './models'
import authRouter from './routes/auth'
import commentsRouter from './routes/comments'
import reactionsRouter from './routes/reactions'
import repliesRouter from './routes/replies'
import topicsRouter from './routes/topics'

const app = express()

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000'

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  })
)
app.use(express.json())

app.use(
  session({
    name: 'forum_sid',
    secret: process.env.SESSION_SECRET || 'dev_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
)
const port = Number(process.env.SERVER_PORT) || 3001

connectToDatabase()
  .then(() => {
    initModels()
    return sequelize.sync()
  })
  .catch(error => {
    console.error('Failed to connect to the database', error)
  })

app.use('/api', authRouter)
app.use('/topics', requireAuth, topicsRouter)
app.use('/comments', requireAuth, commentsRouter)
app.use('/replies', requireAuth, repliesRouter)
app.use('/reactions', requireAuth, reactionsRouter)

app.get('/friends', (_, res) => {
  res.json([
    { name: 'Саша', secondName: 'Панов' },
    { name: 'Лёша', secondName: 'Садовников' },
    { name: 'Серёжа', secondName: 'Иванов' },
  ])
})

app.get('/user', (_, res) => {
  res.json({ name: '</script>Степа', secondName: 'Степанов' })
})

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
