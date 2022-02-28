const Discord = require("discord.js");
const disbut = require("discord-buttons");
module.exports = {
  name: "gender_menu",
  description: "Command to change voice language",
  async execute(menu_clicked, servers, voices, langs) {
    var message = menu_clicked.message;
    var server_id = menu_clicked.guild.id;
    var lang = servers.get(`${server_id}.lang`);

    var user_id = menu_clicked.clicker.id;
    var values = menu_clicked.values[0].split(":");
    var value = values[0];

    let message_embed = new Discord.MessageEmbed();

    var description = menu_clicked.message.embeds[0].description.replace("-1-", value);

    message_embed
      .setColor(0x69d654)//#22cc00
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_user_voice_lang`)} (2/3)`)
      .setDescription(description)
      .setFooter(lang);

    var female = voices.get(`${value}.FEMALE`);
    var male = voices.get(`${value}.MALE`);

    let FEMALE = new disbut.MessageMenuOption()
        .setLabel('FEMALE')
        .setValue(`FEMALE:${user_id}:${value}:${values[2]}`)
        .setEmoji('♀️')
        .setDescription('Female Voice');

    let MALE = new disbut.MessageMenuOption()
        .setLabel('MALE')
        .setValue(`MALE:${user_id}:${value}:${values[2]}`)
        .setEmoji('♂️')
        .setDescription('Male Voice');

    let gender_select = new disbut.MessageMenu()
        .setID('gender_menu')
        .setPlaceholder('Click me! :D')
        .setMaxValues(1)
        .setMinValues(1);

    if(female.length !== 0){
        gender_select.addOption(FEMALE);
    }
    if(male.length !== 0){
        gender_select.addOption(MALE);
    }

    
    
    
    let gender_AR = new disbut.MessageActionRow().addComponents(gender_select);



    message.edit(message_embed, gender_AR);
    menu_clicked.reply.defer();
    
  },
};
