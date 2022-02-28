const Discord = require("discord.js");
module.exports = {
  name: "quota",
  description: "Quota check",
  async execute(message, servers, langs, server_id) {
    var prefix = servers.get(`${server_id}.prefix`);
    var lang = servers.get(`${server_id}.lang`);

    let message_embed = new Discord.MessageEmbed();

    var grey_array = [
      "<:1_grey:865524125627711529>",
      "<:2_grey:865524125690232832>",
      "<:3_grey:865524125698752532>",
      "<:4_grey:865524125749608448>",
      "<:5_grey:865524125522722817>",
      "<:6_grey:865524125850533898>",
      "<:7_grey:865524125710680084>",
      "<:8_grey:865524125832577034>",
      "<:9_grey:865524125983309834>",
      "<:10_grey:865524125799546900>",
    ];
    var grey_array_wave = [
      "<:1_grey:865524125627711529>",
      "<:2_grey:865524125690232832>",
      "<:3_grey:865524125698752532>",
      "<:4_grey:865524125749608448>",
      "<:5_grey:865524125522722817>",
      "<:6_grey:865524125850533898>",
      "<:7_grey:865524125710680084>",
      "<:8_grey:865524125832577034>",
      "<:9_grey:865524125983309834>",
      "<:10_grey:865524125799546900>",
    ];
    var color_array = [
      "<:1:865520765942890496>",
      "<:2:865520765955473418>",
      "<:3:865520765628842005>",
      "<:4:865520766123507732>",
      "<:5:865520765927686165>",
      "<:6:865520766410162176>",
      "<:7:865520766089691177>",
      "<:8:865520765868834817>",
      "<:9_:865520765927686145>",
      "<:10:865521581945913345>",
    ];

    var char_number_std = servers.get(`${server_id}.char_number`);
    var char_max_std = servers.get(`${server_id}.char_max`);

    var char_number_wave = servers.get(`${server_id}.char_number_wave`);
    var char_max_wave = servers.get(`${server_id}.char_max_wave`);

    var percent = parseInt((char_number_std / char_max_std) * 100);
    for (let i = 0; i < percent / 10; i++) {
      grey_array[i] = color_array[i];
    }

    var percent_wave = parseInt((char_number_wave / char_max_wave) * 100);
    for (let i = 0; i < percent_wave / 10; i++) {
      grey_array_wave[i] = color_array[i];
    }

    var fields = [
      { name: ",", value: `${langs.get(`${lang}.word_frase_std`)} ${char_number_std}/${char_max_std}` },
      {
        name: ``,
        value: grey_array.join(""),
      },
      { name: ",", value: `${langs.get(`${lang}.word_frase_wave`)} ${char_number_wave}/${char_max_wave}` },
      {
        name: ``,
        value: grey_array_wave.join(""),
      },
    ];
    var description = langs
      .get(`${lang}.description_quota`)
      .concat(
        [
          "\n\n",
          `${langs.get(`${lang}.word_frase`)} ${char_number_std}/${char_max_std}`,
          `\n`,
          `${grey_array.join(" ")}`,
          "\n\n",
          `${langs.get(`${lang}.word_frase_wave`)} ${char_number_wave}/${char_max_wave}`,
          `\n`,
          `${grey_array_wave.join(" ")}`,
        ].join("")
      );
    message_embed
      .setColor(0xf7c500)
      .setTitle(`Txt2Speech - ${langs.get(`${lang}.title_quota`)}`)
      .setDescription(description)
      .setFooter(lang);

    var h = await message.channel.send(message_embed);
  },
};
//.concat(["\n\n", `${langs.get(`${lang}.word_frase`)} ${char_number_std}/${char_max_std}`, `\n`, `${grey_array.join(" ")}`, "\n\n"].join("")))
