const sharp = require("sharp");
const Discord = require("discord.js");
var db = require("quick.db");

const client = new Discord.Client();

var set_img, staged_message;
client.once("ready", async () => {
  set_img = new db.table("settings_img");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "your voice. (t2s help)",
      type: "PLAYING",
    },
  });
  runner();
});
var numb = ['000','001','010','011','100','101','110','111','200','201','210','211','020','021','120','121','002','012','102','112']

async function runner() {
  var settings = parseInt("000", 2);
  for (let selected_nbr = 1; selected_nbr < 4; selected_nbr++) {
    for (let index = 0; index < numb.length; index++){
      var images = [
        { input: `./images/settings/all.png`, gravity: "southeast" },
        { input: `./images/settings/${numb[index]}.png`, gravity: "southeast" },
        { input: `./images/settings/select${selected_nbr}.png`, gravity: "southeast" },
      ];
      console.log(images);
      sharp(`./images/settings/background_ENG.png`)
        .composite(images)
        .toBuffer()
        .then(async function (outputBuffer) {
          staged_message = client.guilds.cache
            .get(client.home_id)
            .channels.cache.get(client.image_channel)
            .send("image", {
              files: [outputBuffer],
            });
          var url = staged_message.attachments.first().url;
          set_img.set(`ENG.S${selected_nbr}-${settings.toString(2)}`, url);
        })
        .catch((err) => {
          client.guilds.cache.get(client.home_id).channels.cache.get(client.image_channel).send("Something went wrong @here #158");
          console.log(err);
        });
    }
  }
}

client.login("ODQ1MjI3OTg3NTY0ODg4MDc0.YKd55w.KWABMwMplv_gerIq84cMXUbwaXg");
