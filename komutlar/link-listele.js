const discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const moment = require("moment");

exports.run = async (client, message, args) => {
  let linkler = db.fetch(`linkler`);
  let hataembed = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`Hata`)
    .setDescription(`Bir hata oldu`);
  if (message.guild) {
    message.delete();
    message.channel.send(
      hataembed.setDescription(`Lütfen bu komutu özelden kullanın`)
    );
    return;
  }
  if (!linkler)
    return message.channel.send(hataembed.setDescription(`Botta hiç link yok`));
  if (!args[0])
    return message.channel.send(
      hataembed.setDescription(
        `Lütfen bir argüman giriniz\nArgümanlar: **hepsi , bilgi , [ADMIN] admin-hepsi**`
      )
    );
  if (args[0] === "hepsi") {
    if (!linkler.filter(a => a.sahipID === message.author.id))
      return message.channel.send(
        hataembed.setDescription(`Daha önce hiç link eklememişsin`)
      );
    let a = [];
    linkler
      .filter(a => a.sahipID === message.author.id)
      .forEach(s => a.push(`${s.site} ~ Eklenme tarihi: ${s.eklenmeTarihi}`));
    message.channel.send(
      new discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`${message.author.username} Eklediği linkler`)
        .setDescription(`Eklediğin linkler\n${a.join("\n")}`)
    );
  }
  if (args[0] === "admin-hepsi") {
    if (message.author.id !== "351008627726876692")
      return message.channel.send(hataembed.setDescription(`Admin değilsin !`));
    let a1 = [];
    let count = 0;
    linkler.forEach(
      s =>
        a1.push(
          `${s.site} ~ Ekleyen: ${s.sahipTag} ~ Eklenme tarihi: ${s.eklenmeTarihi}`
        ) && count++
    );
    message.channel.send(
      count + " Kadar bot bulundu\n" + "```" + a1.join("\n") + "```"
    );
  }
  if (args[0] === "bilgi") {
    if (!linkler.filter(a => a.sahipID === message.author.id))
      return message.channel.send(
        hataembed.setDescription(`Daha önce hiç link eklememişsin`)
      );
    if (!args[1])
      return message.channel.send(
        hataembed.setDescription(`Lütfen bir link girin`)
      );
    if (!args[1].startsWith("https://"))
      return message.channel.send(
        hataembed.setDescription(
          `Lütfen linklerinin **https://** İle başladığını kontrol et`
        )
      );
    if (!linkler.find(a => a.site === args[1]))
      return message.channel.send(
        hataembed.setDescription(`Sistemde böyle bir link yok`)
      );
    let link = linkler.find(a => a.site === args[0]);
    if (message.author.id !== "351008627726876692")
      if (link.sahipID !== message.author.id)
        return message.channel.send(
          hataembed.setDescription(`Bu link'e bakamazsın !`)
        );
    let bilgileri = [];
    linkler.find(
      a =>
        a.site === args[1] &&
        bilgileri.push(
          `Url: ${a.site} ~ Sahibi: ${a.sahipTag} ~ Eklenme tarihi: ${a.eklenmeTarihi}`
        )
    );
    message.channel.send(
      new discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`Bilgi`)
        .setDescription(
          `Sistemimde \`${
            args[1]
          }\` Linkini buldum işte bilgileri\n${bilgileri}`
        )
    );
  }
};
exports.conf = {
  aliases: ["listele"]
};
exports.help = {
  name: "liste"
};
