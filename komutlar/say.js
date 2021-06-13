const discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const moment = require("moment")

exports.run = async(client, message, args) => {
let linkler = db.fetch(`linkler`)
let count = 0;
linkler.forEach(() => count++)
const embed = new discord.MessageEmbed()
.setTitle(`Uptime`)
.setDescription(`**${count}** Kadar bot uptime ediliyor`)
.setColor("YELLOW")
message.channel.send(embed)
}
exports.conf = {
aliases: []
}
exports.help = {
name: "say"
}