// Keep-alive server for Heroku/Render
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>SHOBII BOT</title></head>
      <body style="background:#000;color:#0f0;font-family:monospace;text-align:center;padding:50px">
        <h1>🤖 SHOBII BOT</h1>
        <p>✅ Bot is Running!</p>
        <p>👤 Owner: <b>Shobii</b></p>
        <p>📞 +923270321760</p>
        <p>⚡ Status: Online</p>
      </body>
    </html>
  `)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
module.exports = app
