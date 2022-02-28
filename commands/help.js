const Discord = require("discord.js");
const disbut = require("discord-buttons");

module.exports = {
  name: "help",
  description: "User Help command",
  async execute(message, servers, langs, server_id) {
   
    var lang = servers.get(`${server_id}.lang`);

    let message_embed = new Discord.MessageEmbed();
    var fields = [
      {
        name: langs.get(`${lang}.cat_user`),
        value: langs.get(`${lang}.list_user`),
        inline: true,
      },
      {
        name: langs.get(`${lang}.cat_info`),
        value: langs.get(`${lang}.list_info`),
        inline: true,
      },
      {
        name: langs.get(`${lang}.cat_server`),
        value: langs.get(`${lang}.list_server`),
        inline: true,
      },
    ];
    console.log(fields);
    message_embed
      .setColor(0xff367c)
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_help`)}`)
      .setDescription(langs.get(`${lang}.description_help`))
      .addFields(fields)
      .setFooter(lang)
      .setThumbnail("https://cdn.discordapp.com/attachments/865949208196022314/865949261626736640/help.gif");

    let cat_select = new disbut.MessageMenu().setID("cat_select").setPlaceholder("Click me").setMaxValues(1).setMinValues(1);

    var title = langs.get(`${lang}.cat_user`).split("**")[1];
    console.log(title);
    let user_entry = new disbut.MessageMenuOption().setLabel(title).setValue(`cat:user`).setEmoji("866012541774725140");

    title = langs.get(`${lang}.cat_info`).split("**")[1];
    let info_entry = new disbut.MessageMenuOption().setLabel(title).setValue(`cat:info`).setEmoji("ℹ️");
    console.log(title);
    title = langs.get(`${lang}.cat_server`).split("**")[1];
    let server_entry = new disbut.MessageMenuOption().setLabel(title).setValue(`cat:server`).setEmoji("⚙️");
    console.log(title);
    cat_select.addOptions(user_entry, info_entry, server_entry);

    let cat_AR = new disbut.MessageActionRow().addComponents(cat_select);
    var h = await message.channel.send(message_embed, cat_AR);
  },
};
