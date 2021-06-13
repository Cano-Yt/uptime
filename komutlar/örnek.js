const discord = require("discord.js");
const ayarlar = require("../ayarlar.json")
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const moment = require("moment")

exports.run = async(client, message, args) => {
  
}
exports.conf = {
aliases: []
}
exports.help = {
name: "örnek"
}