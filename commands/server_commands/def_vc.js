module.exports = {
    name: "new_prefix",
    description: "Change Prefix",
    async execute(message, args, servers, server_id) {
      var new_prefix = args[0];
      servers.set(`${server_id}.prefix`, new_prefix);
      message.react("✅");
    },
  };
  