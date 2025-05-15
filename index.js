// index.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/rekomendasi', async (req, res) => {
  const { mood, location, time, email } = req.body;

  // 1. Klasifikasi mood (pakai if sederhana)
  let kategori = 'tenang';
  if (mood.includes('bosan') || mood.includes('butuh hiburan')) kategori = 'seru';

  // 2. Cari tempat dari Google Maps (mocked)
  const places = [
    `Taman Kota di ${location}`,
    `Tempat nongkrong lucu di ${location}`,
    `Wisata alam buat healing di ${location}`
  ];

  // 3. Kirim via EmailJS
  // 👉 Kirim POST ke EmailJS API

  await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
    service_id: "your_service_id",
    template_id: "your_template_id",
    user_id: "your_user_id",
    template_params: {
      to_email: email,
      message: places.join('\n')
    }
  });

  res.send({ status: "Email dikirim!", places });
});

app.listen(3000, () => console.log("Swbutjan ready di port 3000"));
