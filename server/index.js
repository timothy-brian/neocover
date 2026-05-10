import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import premiRouter from './routes/premi.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/premi', premiRouter)

app.get('/health', (_, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`)
})