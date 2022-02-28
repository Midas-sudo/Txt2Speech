const Discord = require("discord.js");
var db = require("quick.db");
module.exports = {
  name: "voice",
  description: "Command to check the current selected voice",
  async execute(message, servers, langs, server_id) {
    var lang = servers.get(`${server_id}.lang`);
    var prefix = servers.get(`${server_id}.prefix`);
    var user_id = message.author.id;
    var mentions = message.mentions.users;
    var first = mentions.first();
    console.log(mentions, first);
    if (first !== undefined) {
      if (first.id !== user_id) {
        var title = langs.get(`${lang}.title_current_voice`).replace("-0-", first.username);
        user_id = first.id;
        console.log(title, first.username);
      }
    } else {
      var title = langs.get(`${lang}.title_current_voice`).replace("-0-", "Your");
      console.log(title);
    }

    let message_embed = new Discord.MessageEmbed();
    var people_table = new db.table(["P", server_id].join(""));

    var voice_settings = people_table.get(`${user_id}`);
    console.log(voice_settings);
    var description = langs
      .get(`${lang}.description_current_voice`)
      .replace("-1-", voice_settings.languageCode)
      .replace("-2-", voice_settings.gender)
      .replace("-3-", voice_settings.name)
      .replace("-4-", voice_settings.pitch)
      .replace("-5-", voice_settings.speakingRate)
      .replace("-6-", voice_settings.volumeGainDb)
      .replace("-7-", prefix)
      .replace("-8-", prefix);

    message_embed.setColor(0xff367c).setTitle(`Txt2Speech - ${title}`).setDescription(description).setFooter(lang);

    message.channel.send(message_embed);
  },
};
