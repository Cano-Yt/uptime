const discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const moment = require("moment")
const kontrol = require('node-fetch');
const checker = require('site-checker');
exports.run = async(client, message, args) => {
  let hataembed = new discord.MessageEmbed().setColor("RED").setTitle(`Hata`).setDescription(`Bir hata oldu`)

  if(message.guild){
 message.delete()
 message.channel.send(hataembed.setDescription(`Lütfen bu komutu özelden kullanın`))
return;
}
if(db.get(`Link_sayı__${message.author.id}`) >= 5) return message.channel.send(hataembed.setDescription(`Bot ekleme sınırındasın lütfen birkaç bot silip öyle dene`))
if(!args[0]) return message.channel.send(hataembed.setDescription(`Bir link belirtmelisin`))
if(!args[0].startsWith('https://')) return message.channel.send(hataembed.setDescription(`Lütfen linklerinin **https://** İle başladığını kontrol et`))
if(args[0] === "https://glitch.me") return message.channel.send(hataembed.setDescription(`Lütfen geçerli bir link gir`))
let linkler = await db.fetch(`linkler`)
let linkleri = 1;
if(linkler) {
let count = 0;
linkler.forEach(() => count++)
if(linkler.find(a => a.site === args[0])) return message.channel.send(hataembed.setDescription(`${count} Link arasında senin yazdığın linkte var\nAynı linki tekrar ekleyemezsin`))
linkler.filter(a => a.sahipID === message.author.id).forEach(() => linkleri++)
} 

db.add(`Link_sayı__${message.author.id}`, 1)
db.push(`linkler`, { site: args[0], sahipID: message.author.id, sahipTag: message.author.tag, sahipName: message.author.username, eklenmeTarihi: moment(Date.now()).format('DD/MM/YYYY HH:mm')})
message.channel.send(new discord.MessageEmbed().setColor("YELLOW").setTitle(`Başarılı`).setDescription(`\`${args[0]}\` Linki için **Uptime** başladı\nToplam **${linkleri}** kadar linkiniz oldu`))
}
exports.conf = {
aliases: []
}
exports.help = {
name: "ekle"
}