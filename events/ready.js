const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`);
  console.log(`• ALTYAPI Başlatılıyor...`);
  console.log(`• Komutlar Başarıyla Yüklendi!`);
  console.log(`• Discorda Başarıyla Bağlandı!`);
  client.user.setStatus("online"); 
  setInterval(() => {
  let linkler = db.get(`linkler`)
  let count = 0;
  let sunucu = client.guilds.cache.size
  linkler.forEach(() => count++)
  client.user.setActivity(`/yardım ${count} Bot | ${sunucu} Sunucu`, { type: "WATCHING" });
  count = 0
  }, 20000)
  console.log(`• Oynuyor Başarıyla Ayarlandı!`);
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}]`);
};
