const Discord = require("discord.js");
const disbut = require("discord-buttons");

module.exports = {
  name: "default_voice",
  description: "Command to change the server voice language",
  async execute(message, servers, langs, voices, server_id) {
    var lang = servers.get(`${server_id}.lang`);
    var user_id = message.author.id;
    let message_embed = new Discord.MessageEmbed();
    var data = voices.all();

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(`${langs.get(`${lang}.insuficient_permissions`)}`);
      message.react("❌");
      return;
    }

    var available_voices = data.map(function (e) {
      return e.ID;
    });

    message_embed
      .setColor(0xb8ebae)
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_server_voice_lang`)} (1/3)`)
      .setDescription(langs.get(`${lang}.description_server_voice_lang`))
      .setFooter(lang);

    let lang_select = new disbut.MessageMenu().setID("lang_menu").setPlaceholder("click me").setMaxValues(1).setMinValues(1);

    var index = 0;
    available_voices.forEach((voice) => {
      if ([0, 2, 3, 4, 5, 10, 11, 14, 16, 20, 24, 27, 29, 30, 31, 33, 35, 40, 41, 43, 45, 46, 47, 48, 49, 50].includes(index)) {
        index++;
        return;
      }
      var descritpion = voices.get(`${voice}.description`);
      var emoji = voices.get(`${voice}.emoji`);
      let entry = new disbut.MessageMenuOption().setLabel(voice).setValue(`${voice}:${user_id}:true`).setEmoji(emoji).setDescription(descritpion);
      lang_select.addOption(entry);
      index++;
    });

    let lang_AR = new disbut.MessageActionRow().addComponents(lang_select);
    message.channel.send(message_embed, lang_AR);
  },
};
