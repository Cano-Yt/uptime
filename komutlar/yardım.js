const discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const moment = require("moment")
exports.run = async(client, message, args) => {
  const embed = new discord.MessageEmbed()
  .setThumbnail(message.author.avatarURL())
  .setTitle(`Komutlar`)
  .setAuthor(`${client.user.username} Yardım menüsü`)
  .setDescription(`
  **ekle**: Link eklemenizi sağlar
  **sil**: Eklediğiniz linki silmenizi sağlar
  **liste**: Linklerinizi listeler
  **say**: Uptime edilen botları sayar
  `)
  .setColor("YELLOW")

  if (message.guild) {
    message.author.send(embed)
    .then(m => {
      message.channel.send(`Özelden yardım menümü attım`);
    })
    .catch(err => {
      message.channel.send(`Özel mesajlarınız kapalı :cry:`);
      return;
    });
  } else {
    message.author.send(embed).catch(err => {
      console.log(err.message);
    });
  }
}
exports.conf = {
  aliases: ["help"]
}
exports.help = {
  name: "yardım"
}