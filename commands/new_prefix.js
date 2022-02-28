module.exports = {
  name: "new_prefix",
  description: "Change Prefix",
  async execute(message, args, servers,langs, server_id) {
    var lang = servers.get(`${server_id}.lang`);
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(`${langs.get(`${lang}.insuficient_permissions`)}`);
      message.react("❌");
      return;
    }
    var new_prefix = args[0];
    servers.set(`${server_id}.prefix`, new_prefix);
    message.react("✅");
  },
};
