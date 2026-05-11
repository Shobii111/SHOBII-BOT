const config = {
  // ╔══════════════════════════════════════╗
  // ║        SHOBII BOT CONFIG             ║
  // ╚══════════════════════════════════════╝

  botname: "SHOBII BOT",
  owner: "Shobii",
  ownernumber: "923270321760",
  wm: "SHOBII BOT\n+923270321760",

  // Contact / Support
  support: "https://wa.me/923270321760",
  ownerlink: "https://wa.me/923270321760",

  // Social Links
  channel: "https://whatsapp.com/channel/SHOBII",  // apna channel link dalo
  github: "https://github.com/",                    // apna GitHub dalo
  instagram: "",                                     // apna Instagram dalo

  // Bot Settings
  prefix: ".",
  mode: "public",       // public = sab use karen, private = sirf owner
  
  // Auto Features
  autoread: false,
  autoreact: false,
  statusview: true,
  antidelete: "all",
  antilink: true,

  // Menu Image (optional - apni image URL dalo)
  menu_image: "",

  // Session
  session: process.env.SESSION_ID || "",
}

module.exports = config
