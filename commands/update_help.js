const Discord = require("discord.js");
const disbut = require("discord-buttons");

module.exports = {
  name: "update_help",
  description: "Help embed update",
  async execute(button, servers, langs) {
    var button_id = button.id;
    var message = button.message;
    var server_id = message.guild.id;
    var prefix = servers.get(`${server_id}.prefix`);

    var lang = button.message.embeds[0].footer.text;

    let new_embed = new Discord.MessageEmbed();

    new_embed.setFooter(lang).setThumbnail("https://cdn.discordapp.com/attachments/865949208196022314/865949261626736640/help.gif");

    var user_fields = [
      {
        name: `**${prefix}** help`,
        value: langs.get(`${lang}.help`),
        inline: true,
      },
      {
        name: `**${prefix}** voice_lang`,
        value: langs.get(`${lang}.voice_lang`),
        inline: true,
      },
      {
        name: `**${prefix}** quota`,
        value: langs.get(`${lang}.quota`),
        inline: true,
      },
    ];

    var server_fields = [
      {
        name: `**${prefix}** set_lang`,
        value: langs.get(`${lang}.text_lang`),
        inline: true,
      },
      {
        name: `**${prefix}** set_default`,
        value: langs.get(`${lang}.default`),
        inline: true,
      },
      {
        name: `**${prefix}** new_prefix`,
        value: langs.get(`${lang}.new_prefix`),
        inline: true,
      },
    ];

    let btn_server = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.server_btn`))
      .setEmoji("865978424928501800")
      .setID("server_configs")
      .setStyle("2");
    let btn_user = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.user_btn`))
      .setEmoji("👤")
      .setID("user_configs")
      .setStyle("2");

    switch (button_id) {
      case "server_configs":
        btn_server.setDisabled();
        new_embed
          .addFields(server_fields)
          .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_server_help`)}`)
          .setDescription(langs.get(`${lang}.description_server_help`))
          .setColor(0xb936ff);
        break;
      case "user_configs":
        btn_user.setDisabled();
        new_embed
          .addFields(user_fields)
          .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_user_help`)}`)
          .setDescription(langs.get(`${lang}.description_user_help`))
          .setColor(0xff367c);
        break;
    }

    message.edit(new_embed, { buttons: [btn_user, btn_server] });
    button.reply.defer();
  },
};
