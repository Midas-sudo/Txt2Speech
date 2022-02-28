module.exports = {
  name: "remove_default",
  description: "Removes default channel",
  async execute(message, servers, langs, server_id) {
    var lang = servers.get(`${server_id}.lang`);
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      message.channel.send(`${langs.get(`${lang}.insuficient_permissions`)}`);
      message.react("❌");
      return;
    }
    servers.set(`${server_id}.text_chn`, "");
    message.react("✅");
  },
};
