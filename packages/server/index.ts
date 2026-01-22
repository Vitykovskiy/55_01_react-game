import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import https from 'https'
import { createClientAndConnect } from './db'
import { authMiddleware } from './middleware/auth'
import { createSession, Session } from './sessionStore'

const app = express()
app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
app.use(express.json())
app.use(authMiddleware)
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

const YA_SIGNIN_URL = 'https://ya-praktikum.tech/api/v2/auth/signin'

const requestPractikumSignin = async (
  login: string,
  password: string
): Promise<{ status: number; data: unknown; cookies: string[] }> => {
  const payload = JSON.stringify({ login, password })
  const url = new URL(YA_SIGNIN_URL)

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        method: 'POST',
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        protocol: url.protocol,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      res => {
        let rawBody = ''
        res.on('data', chunk => {
          rawBody += chunk
        })

        res.on('end', () => {
          let data: unknown = rawBody
          if (rawBody) {
            try {
              data = JSON.parse(rawBody)
            } catch {
              data = rawBody
            }
          }

          const setCookie = res.headers['set-cookie']
          const cookies = Array.isArray(setCookie)
            ? setCookie
            : setCookie
            ? [setCookie]
            : []

          resolve({
            status: res.statusCode || 500,
            data,
            cookies,
          })
        })
      }
    )

    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

app.post('/auth/signin', (req, res) => {
  const { login, password } = req.body || {}

  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password required' })
  }

  return requestPractikumSignin(login, password)
    .then(({ status, data, cookies }) => {
      if (status >= 400) {
        return res.status(status).json(data)
      }

      const sid = createSession(login, cookies)

      res.cookie('bff_sid', sid, {
        httpOnly: true,
        sameSite: 'lax',
      })

      return res.json({ ok: true })
    })
    .catch(() => res.status(502).json({ message: 'Signin failed' }))
})

app.get('/auth/user', (req, res) => {
  const session = (req as typeof req & { session?: Session }).session
  const login = session?.login || 'user'

  return res.json({
    id: 1,
    first_name: login,
    second_name: 'User',
    avatar: '',
    login,
    email: `${login}@example.com`,
    phone: '+10000000000',
  })
})

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
