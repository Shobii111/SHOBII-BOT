// ╔══════════════════════════════════════════╗
// ║          SHOBII BOT - Main File          ║
// ║     Owner: Shobii | +923270321760        ║
// ╚══════════════════════════════════════════╝

require('dotenv').config()
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const pino = require('pino')
const path = require('path')
const fs = require('fs-extra')
const config = require('./config')

const SESSION_DIR = './sessions'

async function startBot() {
  await fs.ensureDir(SESSION_DIR)

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR)
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    auth: state,
    printQRInTerminal: true,
    browser: ['SHOBII BOT', 'Chrome', '1.0.0'],
    getMessage: async () => ({ conversation: '' })
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log(`\n✅ SHOBII BOT Connected!\n👤 Owner: Shobii\n📞 +923270321760\n`)
    } else if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) {
        console.log('🔄 Reconnecting...')
        startBot()
      } else {
        console.log('❌ Logged out. Please restart.')
      }
    }
  })

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return
    const msg = messages[0]
    if (!msg.message) return

    const from = msg.key.remoteJid
    const isGroup = from.endsWith('@g.us')
    const sender = isGroup ? msg.key.participant : from
    const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || ''
    const prefix = process.env.PREFIX || config.prefix || '.'
    const isCmd = body.startsWith(prefix)
    if (!isCmd) return

    const cmd = body.slice(prefix.length).trim().split(' ')[0].toLowerCase()
    const args = body.slice(prefix.length + cmd.length).trim().split(' ')

    // Helper: send text reply
    const reply = (text) => sock.sendMessage(from, { text }, { quoted: msg })

    // ══════════════════════════════════
    //         SHOBII BOT COMMANDS
    // ══════════════════════════════════

    switch (cmd) {

      case 'menu':
      case 'help':
        await reply(`╔══════════════════════╗
║     SHOBII BOT 🤖     ║
╚══════════════════════╝

👤 *Owner:* Shobii
📞 *Contact:* +923270321760
🌐 *Rabta karen bot k liye*

━━━━━━━━━━━━━━━━━━━━━━

📌 *BASIC COMMANDS*
${prefix}menu - Ye menu
${prefix}ping - Bot check karo
${prefix}owner - Owner info
${prefix}info - Bot info

📌 *FUN COMMANDS*
${prefix}joke - Funny joke
${prefix}quote - Inspirational quote

📌 *UTILITY*
${prefix}alive - Bot online check
${prefix}speed - Bot speed

━━━━━━━━━━━━━━━━━━━━━━
*Powered by Shobii | +923270321760*`)
        break

      case 'ping':
      case 'alive':
        await reply(`✅ *SHOBII BOT Online Hai!*\n⚡ Speed: Fast\n👤 Owner: Shobii\n📞 +923270321760`)
        break

      case 'owner':
        await reply(`👤 *Bot Owner*\n\nNaam: *Shobii*\nWhatsApp: *+923270321760*\n\nBot deploy karne ya session lene ke liye contact karen 👆`)
        break

      case 'info':
        await reply(`╔══════════════════════╗
║      SHOBII BOT       ║
╚══════════════════════╝

🤖 *Bot Name:* SHOBII BOT
👤 *Owner:* Shobii
📞 *Number:* +923270321760
🔧 *Version:* 1.0.0
⚡ *Status:* Online

*Powered by Shobii*`)
        break

      case 'joke':
        const jokes = [
          "Teacher: Tum late kyun aaye?\nStudent: Aap ne kaha tha kal aana, kal kabhi aata nahi! 😂",
          "Doctor: Roz subah 5km daudte raho\n1 mahine baad patient ne phone kiya: Main ab 150km dur hun, wapis kaise aun? 😂",
          "Dost: Bhai pyaar ho gaya mujhe!\nMain: Kab se?\nDost: Budget dekhne k baad se nahi hua... 😂"
        ]
        await reply(jokes[Math.floor(Math.random() * jokes.length)])
        break

      case 'quote':
        const quotes = [
          "\"Mehnat karo, naseeb apne aap badal jaata hai\" 💪",
          "\"Har mushkil k peeche ek aasan raasta hota hai\" 🌟",
          "\"Himmat rakhne wale hi manzil paate hain\" 🎯"
        ]
        await reply(quotes[Math.floor(Math.random() * quotes.length)])
        break

      default:
        // Unknown command - silently ignore
        break
    }
  })
}

startBot().catch(console.error)
