const Discord = require("discord.js");
const disbut = require("discord-buttons");
module.exports = {
  name: "info_menu",
  description: "Changes the help embed to info comands",
  async execute(menu_clicked, servers, langs) {
    var message = menu_clicked.message;
    var server_id = menu_clicked.guild.id;
    var lang = servers.get(`${server_id}.lang`);
    var prefix = servers.get(`${server_id}.prefix`);

    let message_embed = new Discord.MessageEmbed();

    var fields = [
      {
        name: `**${prefix}** quota`,
        value: langs.get(`${lang}.quota`),
      },
      {
        name: `**${prefix}** help`,
        value: langs.get(`${lang}.help`),
      },
    ];

    message_embed
      .setColor(0x75baff)
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_info_help`)}`)
      .setDescription(langs.get(`${lang}.description_info_help`))
      .addFields(fields)
      .setFooter(lang)
      .setThumbnail("https://cdn.discordapp.com/attachments/865949208196022314/865949261626736640/help.gif");

    let cat_select = new disbut.MessageMenu().setID("cat_select").setPlaceholder("Click me").setMaxValues(1).setMinValues(1);

    var title = langs.get(`${lang}.cat_cat`).split("**")[1];

    let cat_entry = new disbut.MessageMenuOption().setLabel(title).setValue(`cat:cat`).setEmoji("📚");

    title = langs.get(`${lang}.cat_user`).split("**")[1];
    let user_entry = new disbut.MessageMenuOption().setLabel(title).setValue(`cat:user`).setEmoji("866012541774725140");

    title = langs.get(`${lang}.cat_server`).split("**")[1];
    let server_entry = new disbut.MessageMenuOption().setLabel(title).setValue(`cat:server`).setEmoji("⚙️");

    cat_select.addOptions(cat_entry, user_entry, server_entry);

    let cat_AR = new disbut.MessageActionRow().addComponents(cat_select);
    var h = await message.edit(message_embed, cat_AR);
    menu_clicked.reply.defer();
  },
};
