const discord = require("discord.js");
const client = new discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase({databasePath:"./Genel.json"});
const kontrol = require("node-fetch");
var prefix = ayarlar.prefix;

require("./inlinereply");

client.on("error", error => {
  console.log(error.message);
});
// botu aktif tutma \\
setInterval(() => {
  kontrol("https://furry-rustic-wannanosaurus.glitch.me/");
}, 40000);
// botu aktif tutma son \\

// Bütün botları aktif etme \\
setInterval(() => {
  let linkler = db.fetch(`linkler`);
  if (linkler) {
    linkler.forEach(s => {
      kontrol(s.site).catch(err => {
        client.channels.cache.get("832575757909360671").send(
          new discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Uptime`)
            .setDescription(
              `${s.site} Linkli bot uptime edilemedi. Sahibi: ${s.sahipTag}\nHatası: \n${err}`
            )
        );
      });
    });
  }
}, 60000);
// Bütün botları aktif etme son \\

// ---------- Komutlar baş -------------\\

// ---------- Komutlar son -------------\\
// --------- Alt tarafa elleme -------------- \\
const reqEvent = event => require(`./events/${event}`);
  client.on("ready", () => reqEvent("ready")(client));
  client.on("message", reqEvent("message"));
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} Adet Komut Yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    console.log(`Yüklenen Komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.login("ODIzOTk0NjY1NTcyNDk5NTU2.YFo61Q.St1KfdnQJQk9Y6YxQ5afP1FI_HE");
