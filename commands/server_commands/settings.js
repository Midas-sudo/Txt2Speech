const sharp = require("sharp");
const disbut = require("discord-buttons");
const Discord = require("discord.js");

module.exports = {
  name: "settings",
  description: "Show server settings",
  async execute(message, servers, langs, server_id, setImg) {
    /*if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(`${langs.get(`${lang}.insuficient_permissions`)}`);
      message.react("❌");
      return;
    }*/
    var user_id = message.author.id;

    var settings = servers.get(`${server_id}.settings`);
    var lang = servers.get(`${server_id}.lang`);
    var client = message.client;
    var staged_message;
    console.log(`images/settings/background_${lang}.png`);
    var images = [
      { input: `./images/settings/${settings}.png`, gravity: "southeast" },
      { input: `./images/settings/select1.png`, gravity: "southeast" },
    ];

    console.log(lang, settings);
    var url = setImg.get(`${lang}.S1-${settings}`);
    console.log(url);

    let btn_up = new disbut.MessageButton().setEmoji("866364961445773343").setID(`set:${user_id}:up:1`).setStyle("2");
    let btn_down = new disbut.MessageButton().setEmoji("866364961390460938").setID(`set:${user_id}:down:1`).setStyle("2");
    let btn_toggle = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.toggle_btn`))
      .setEmoji("866378345909714944")
      .setID(`set:${user_id}:toggle:1`)
      .setStyle("2");
    let btn_close = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.close_btn`))
      .setID(`set:${user_id}:close`)
      .setEmoji("❌")
      .setStyle("2");

    var h = await message.channel.send(url, { buttons: [btn_up, btn_down, btn_toggle, btn_close] });

    /*sharp(`./images/settings/background_${lang}.png`)
      .composite(images)
      .toBuffer()
      .then(async function (outputBuffer) {
        staged_message = await client.guilds.cache
          .get(client.home_id)
          .channels.cache.get(client.image_channel)
          .send("image", {
            files: [outputBuffer],
          });

        let message_embed = new Discord.MessageEmbed().setImage(staged_message.attachments.first().url);


        let btn_up = new disbut.MessageButton().setEmoji("866364961445773343").setID(`set:${user_id}:up:1`).setStyle("2");
        let btn_down = new disbut.MessageButton().setEmoji("866364961390460938").setID(`set:${user_id}:down:1`).setStyle("2");
        let btn_toggle = new disbut.MessageButton()
          .setLabel(langs.get(`${lang}.toggle_btn`))
          .setEmoji("866378345909714944")
          .setID(`set:${user_id}:toggle:1`)
          .setStyle("2");

        var h = await message.channel.send(message_embed, { buttons: [btn_up, btn_down, btn_toggle] });
      })
      .catch((err) => {
        console.log(err);
      });*/
  },
};
