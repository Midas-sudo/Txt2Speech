module.exports = {
    name: "text_lang",
    description: "Change Text Language",
    async execute(message, args, servers,langs, server_id) {
      var lang = servers.get(`${server_id}.lang`);
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        message.channel.send(`${langs.get(`${lang}.insuficient_permissions`)}`);
        message.react("❌");
        return;
      }
      var new_lang = args[0];
      servers.set(`${server_id}.lang`, new_lang);
      message.react("✅");
    },
  };
  