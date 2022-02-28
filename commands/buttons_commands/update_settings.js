const sharp = require("sharp");
const disbut = require("discord-buttons");
const Discord = require("discord.js");

var self = (module.exports = {
  name: "update_settings",
  description: "Show server settings",
  async execute(button, servers, langs, button_values, setImg) {
    var server_id = button.guild.id;
    var settings = servers.get(`${server_id}.settings`);
    var lang = servers.get(`${server_id}.lang`);
    var client = button.client;

    switch (button_values[2]) {
      case "up":
        self.Up(button, button_values, settings, lang, client, langs, setImg);
        break;
      case "down":
        self.Down(button, button_values, settings, lang, client, langs, setImg);
        break;
      case "toggle":
        var new_settings = await self.Toggle(button, button_values, settings, lang, client, langs, setImg);
        servers.set(`${server_id}.settings`, new_settings);
        break;
      case "close":
        button.message.edit(button.message.content, { components: null });
        break;
    }
  },

  Up: async function (button, button_values, settings, lang, client, langs, setImg) {
    var size = settings.length;
    var new_select = parseInt(button_values[3]);
    new_select--;

    if (new_select === 0) {
      new_select = size;
    }

    /*var output_img = await self.Compose(client, settings, new_select, lang);
    var staged_message = await client.guilds.cache
      .get(client.home_id)
      .channels.cache.get(client.image_channel)
      .send("image", {
        files: [output_img],
      });*/

    //let message_embed = new Discord.MessageEmbed().setImage(staged_message.attachments.first().url);

    var url = setImg.get(`${lang}.S${new_select}-${settings}`);
    let btn_up = new disbut.MessageButton().setEmoji("866364961445773343").setID(`set:${button_values[1]}:up:${new_select}`).setStyle("2");
    let btn_down = new disbut.MessageButton().setEmoji("866364961390460938").setID(`set:${button_values[1]}:down:${new_select}`).setStyle("2");
    let btn_toggle = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.toggle_btn`))
      .setEmoji("866378345909714944")
      .setID(`set:${button_values[1]}:toggle:${new_select}`)
      .setStyle("2");
    let btn_close = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.close_btn`))
      .setID(`set:${button_values[1]}:close`)
      .setEmoji("❌")
      .setStyle("2");

    var h = await button.message.edit(url, { buttons: [btn_up, btn_down, btn_toggle, btn_close] });
  },

  Down: async function (button, button_values, settings, lang, client, langs, setImg) {
    var size = settings.length;
    var new_select = parseInt(button_values[3]);
    new_select++;

    if (new_select > size) {
      new_select = 1;
    }

    /*var output_img = await self.Compose(client, settings, new_select, lang);
    var staged_message = await client.guilds.cache
      .get(client.home_id)
      .channels.cache.get(client.image_channel)
      .send("image", {
        files: [output_img],
      });
    let message_embed = new Discord.MessageEmbed().setImage(staged_message.attachments.first().url);*/
    console.log(lang, new_select, settings);
    var url = setImg.get(`${lang}.S${new_select}-${settings}`);
    console.log(url);

    let btn_up = new disbut.MessageButton().setEmoji("866364961445773343").setID(`set:${button_values[1]}:up:${new_select}`).setStyle("2");
    let btn_down = new disbut.MessageButton().setEmoji("866364961390460938").setID(`set:${button_values[1]}:down:${new_select}`).setStyle("2");
    let btn_toggle = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.toggle_btn`))
      .setEmoji("866378345909714944")
      .setID(`set:${button_values[1]}:toggle:${new_select}`)
      .setStyle("2");
    let btn_close = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.close_btn`))
      .setID(`set:${button_values[1]}:close`)
      .setEmoji("❌")
      .setStyle("2");

    var h = await button.message.edit(url, { buttons: [btn_up, btn_down, btn_toggle, btn_close] });
  },

  Toggle: async function (button, button_values, settings, lang, client, langs, setImg) {
    var selected = button_values[3];
    var new_settings = settings.split("");
    console.log(selected, new_settings);
    selected--;
    switch (new_settings[selected]) {
      case "0":
        new_settings[selected] = "2";
        break;
      case "1":
        new_settings[selected] = "0";
        break;
      case "2":
        new_settings[selected] = "1";
        break;
    }
    selected++;
    new_settings = new_settings.join("");
    console.log(selected, new_settings);
    /*var output_img = await self.Compose(client, new_settings, selected, lang);
    var staged_message = await client.guilds.cache
      .get(client.home_id)
      .channels.cache.get(client.image_channel)
      .send("image", {
        files: [output_img],
      });
    let message_embed = new Discord.MessageEmbed().setImage(staged_message.attachments.first().url);*/

    var url = setImg.get(`${lang}.S${button_values[3]}-${new_settings}`);
    let btn_up = new disbut.MessageButton().setEmoji("866364961445773343").setID(`set:${button_values[1]}:up:${selected}`).setStyle("2");
    let btn_down = new disbut.MessageButton().setEmoji("866364961390460938").setID(`set:${button_values[1]}:down:${selected}`).setStyle("2");
    let btn_toggle = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.toggle_btn`))
      .setEmoji("866378345909714944")
      .setID(`set:${button_values[1]}:toggle:${selected}`)
      .setStyle("2");
    let btn_close = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.close_btn`))
      .setID(`set:${button_values[1]}:close`)
      .setEmoji("❌")
      .setStyle("2");

    var h = await button.message.edit(url, { buttons: [btn_up, btn_down, btn_toggle, btn_close] });
    return new_settings;
  },

  Compose: async function (client, settings, selected_nbr, lang) {
    var images = [
      { input: `./images/settings/${settings}.png`, gravity: "southeast" },
      { input: `./images/settings/select${selected_nbr}.png`, gravity: "southeast" },
    ];
    console.log(images);
    return await sharp(`./images/settings/background_${lang}.png`)
      .composite(images)
      .toBuffer()
      .then(async function (outputBuffer) {
        return outputBuffer;
      })
      .catch((err) => {
        client.guilds.cache.get(client.home_id).channels.cache.get(client.image_channel).send("Something went wrong @here #158");
        console.log(err);
      });
  },
});
