const discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const moment = require("moment")
const kontrol = require('node-fetch');
const checker = require('site-checker');
exports.run = async(client, message, args) => {
let linkler = await db.fetch(`linkler`)
let hataembed = new discord.MessageEmbed().setColor("RED").setTitle(`Hata`).setDescription(`Bir hata oldu`)
  if(message.guild){
 message.delete()
 message.channel.send(hataembed.setDescription(`Lütfen bu komutu özelden kullanın`))
return;
}
if(!linkler) return message.channel.send(hataembed.setDescription(`Botta hiç link yok`))
if(!args[0]) return message.channel.send(hataembed.setDescription(`Bir link belirtmelisin`))
if(!args[0].startsWith('https://')) return message.channel.send(hataembed.setDescription(`Lütfen linklerinin **https://** İle başladığını kontrol et`))
if(!linkler.filter(a => a.sahipID === message.author.id)) return message.channel.send(hataembed.setDescription(`Daha hiç link eklememişsin`))
let link = linkler.find(a => a.site === args[0])
if(link.sahipID !== message.author.id) return message.channel.send(hataembed.setDescription(`Bu linki silemezsin !`))
if(!link) return message.channel.send(hataembed.setDescription(`\`${args[0]}\` Linkini bulamadım`))

if(linkler.lenght === 1) {
db.delete(`linkler`)
return message.channel.send(new discord.MessageEmbed().setColor("YELLOW").setTitle(`Başarılı`).setDescription(`\`${args[0]}\` Linki artık uptime olmuyor`))
} else {
  let ex = []
linkler.forEach(async s => {
if(s.site === args[0]) return;
await ex.push(s)
await db.set(`linkler`, ex)
})
await db.substr(`Link_sayı__${message.author.id}`, 1)
message.channel.send(new discord.MessageEmbed().setColor("YELLOW").setTitle(`Başarılı`).setDescription(`\`${args[0]}\` Linki artık uptime olmuyor`))
}
}
exports.conf = {
aliases: []
}
exports.help = {
name: "sil"
}