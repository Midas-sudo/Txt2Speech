const Discord = require("discord.js");
const disbut = require("discord-buttons");
module.exports = {
  name: "type_menu",
  description: "Command to change voice gender",
  async execute(menu_clicked, servers, voices, langs) {
    var message = menu_clicked.message;
    var server_id = menu_clicked.guild.id;
    var lang = servers.get(`${server_id}.lang`);

    var user_id = menu_clicked.clicker.id;
    var gender_selected = menu_clicked.values[0].split(":")[0];
    var voice_selected = menu_clicked.values[0].split(":")[2];
    var server_wide = menu_clicked.values[0].split(":")[3];

    let message_embed = new Discord.MessageEmbed();

    var description = menu_clicked.message.embeds[0].description.replace("-2-", gender_selected);

    message_embed
      .setColor(0x69d654)
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_user_voice_lang`)} (2/3)`)
      .setDescription(description)
      .setFooter(lang);


    var types = voices.get(`${voice_selected}.${gender_selected}`);

    let type_select = new disbut.MessageMenu()
    .setID('type_menu')
    .setPlaceholder('Click me! :D')
    .setMaxValues(1)
    .setMinValues(1);

    types.forEach(type => {
        let entry = new disbut.MessageMenuOption()
            .setLabel(type)
            .setValue(`${type}:${user_id}:${voice_selected}:${gender_selected}:${server_wide}`)
            .setEmoji('◻️');
        type_select.addOption(entry);
    });

    let type_AR = new disbut.MessageActionRow().addComponents(type_select);

    message.edit(message_embed, type_AR);
    menu_clicked.reply.defer();
    
  },
};
