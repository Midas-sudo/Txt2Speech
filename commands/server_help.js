module.exports = {
  name: "server_help",
  description: "Server Help command",
  async execute(message, servers, langs, server_id) {
    var prefix = servers.get(`${server_id}.prefix`);
    var lang = servers.get(`${server_id}.lang`);

    message.channel.send({
      embed: {
        color: 0xf7c500,
        title: "Txt2Speech - Server Commands",
        description: langs.get(`${lang}.description`),
        fields: [
          {
            name: `${prefix}help`,
            value: langs.get(`${lang}.help`),
          },
          {
            name: `${prefix}set_lang`,
            value: langs.get(`${lang}.text_lang`),
          },
          {
            name: `${prefix}set_default`,
            value: langs.get(`${lang}.default`),
          },
          {
            name: `${prefix}new_prefix`,
            value: langs.get(`${lang}.new_prefix`),
          },
        ],
        footer: {
          text: "Para mais ajuda contactar Gonçalo Midoes ",
        },
      },
    });
  },
};
