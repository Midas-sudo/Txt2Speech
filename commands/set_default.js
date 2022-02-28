module.exports = {
  name: "set_default",
  description: "Sets default channel",
  async execute(message, servers, langs, server_id) {
    var lang = servers.get(`${server_id}.lang`);
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(`${langs.get(`${lang}.insuficient_permissions`)}`);
      message.react("❌");
      return;
    }
    var new_chn_id = message.channel.id;
    servers.set(`${server_id}.text_chn`, new_chn_id);
    message.react("✅");
  },
};
