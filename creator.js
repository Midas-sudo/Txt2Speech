const sharp = require("sharp");
const Discord = require("discord.js");
var db = require("quick.db");

const client = new Discord.Client();

var set_img, staged_message;
client.once("ready", async () => {
  set_img = new db.table("setImg");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "your voice. (t2s help)",
      type: "PLAYING",
    },
  });
  runner();
});

var numb = [
  "222",
  "022",
  "122",
  "202",
  "212",
  "220",
  "221",
  "000",
  "001",
  "010",
  "011",
  "100",
  "101",
  "110",
  "111",
  "200",
  "201",
  "210",
  "211",
  "020",
  "021",
  "120",
  "121",
  "002",
  "012",
  "102",
  "112",
];

async function runner() {
  var settings = parseInt("000", 2);
  for (let index = 0; index < numb.length; index++) {
    var temp = settings.toString(2).padStart(3, "0");
    console.log(settings.toString(2));
    var images = [
      { input: `./images/settings/all.png`, gravity: "southeast" },
      { input: `./images/settings/${numb[index]}.png`, gravity: "southeast" },
      { input: `./images/settings/select3.png`, gravity: "southeast" },
    ];
    await sharp(`./images/settings/background_ENG.png`)
      .composite(images)
      .toBuffer()
      .then(async function (outputBuffer) {
        staged_message = await client.guilds.cache
          .get("865949207609212979")
          .channels.cache.get("866354544544055346")
          .send("image", {
            files: [outputBuffer],
          });
        sleep(2000);
        var url = staged_message.attachments.first().url;
        set_img.set(`ENG.S3-${numb[index]}`, url);
      })
      .catch((err) => {
        client.guilds.cache.get("865949207609212979").channels.cache.get("866354544544055346").send("Something went wrong @here #158");
        console.log(err);
      });

    settings++;
  }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

client.login("ODQ1MjI3OTg3NTY0ODg4MDc0.YKd55w.KWABMwMplv_gerIq84cMXUbwaXg");
