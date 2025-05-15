const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/rekomendasi', async (req, res) => {
  const { mood, location, time, email } = req.body;

  let kategori = 'tenang';
  if (mood.includes('bosan') || mood.includes('butuh hiburan')) kategori = 'seru';

  const places = [
    `Taman Kota di ${location}`,
    `Tempat nongkrong lucu di ${location}`,
    `Wisata alam buat healing di ${location}`
  ];

  try {
    await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        to_email: email,
        message: places.join('\n')
      }
    });

    res.send({ status: "Email dikirim!", places });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send({ status: "Gagal kirim email", error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Swbutjan ready di port ${PORT}`));
