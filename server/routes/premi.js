import { Router } from 'express'

const router = Router()

const RATE = {
  mobil: {
    comprehensive: { min: 0.0178, max: 0.0280 },
    tlo:           { min: 0.0050, max: 0.0080 },
  },
  motor: {
    comprehensive: { min: 0.0189, max: 0.0250 },
    tlo:           { min: 0.0040, max: 0.0060 },
  }
}

router.post('/hitung', (req, res) => {
  const { jenis, tipe, harga_kendaraan, tahun } = req.body

  if (!jenis || !tipe || !harga_kendaraan || !tahun) {
    return res.status(400).json({ error: 'Data tidak lengkap' })
  }

  const rate = RATE[jenis]?.[tipe]
  if (!rate) return res.status(400).json({ error: 'Jenis tidak valid' })

  const umur        = new Date().getFullYear() - parseInt(tahun)
  const depresiasi  = Math.min(umur * 0.05, 0.30)
  const nilaiAktual = harga_kendaraan * (1 - depresiasi)

  res.json({
    jenis,
    tipe,
    harga_kendaraan,
    nilai_aktual:    Math.round(nilaiAktual),
    premi_per_bulan: {
      min: Math.round(nilaiAktual * rate.min / 12),
      max: Math.round(nilaiAktual * rate.max / 12)
    },
    premi_per_tahun: {
      min: Math.round(nilaiAktual * rate.min),
      max: Math.round(nilaiAktual * rate.max)
    }
  })
})

export default router