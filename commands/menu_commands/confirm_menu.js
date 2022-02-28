const Discord = require("discord.js");
const disbut = require("discord-buttons");
module.exports = {
  name: "confirm_menu",
  description: "Command to change voice gender",
  async execute(menu_clicked, servers, voices, langs) {
    var message = menu_clicked.message;
    var server_id = menu_clicked.guild.id;
    var lang = servers.get(`${server_id}.lang`);

    var user_id = menu_clicked.clicker.id;
    var type_selected = menu_clicked.values[0].split(":")[0];
    var voice_selected = menu_clicked.values[0].split(":")[2];
    var gender_selected = menu_clicked.values[0].split(":")[3];
    var server_wide = menu_clicked.values[0].split(":")[4];

    let message_embed = new Discord.MessageEmbed();

    var description = menu_clicked.message.embeds[0].description.replace("-3-", type_selected);

    message_embed
      .setColor(0x69d654)
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_user_voice_lang`)} (3/3)`)
      .setDescription(description)
      .setFooter(lang);

    let confirm_btn = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.confirm_btn`))
      .setEmoji("✅")
      .setID(`confirm:${user_id}:${voice_selected}:${gender_selected}:${type_selected}:${server_wide}`)
      .setStyle("2");

    let cancel_btn = new disbut.MessageButton()
      .setLabel(langs.get(`${lang}.cancel_btn`))
      .setEmoji("❌")
      .setID(`cancel:${user_id}:${voice_selected}:${gender_selected}:${type_selected}:${server_wide}`)
      .setStyle("2");

    message.edit(message_embed, { buttons: [confirm_btn, cancel_btn] });
    menu_clicked.reply.defer();
  },
};
