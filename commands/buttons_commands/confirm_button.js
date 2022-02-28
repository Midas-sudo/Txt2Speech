var db = require("quick.db");
module.exports = {
  name: "confirm_button",
  description: "Command to change voice language",
  async execute(button, servers, button_values) {
    var lang = servers.get(`${server_id}.lang`);
    var server_id = button.guild.id;

    var people_table = new db.table(["P", server_id].join(""));
    console.log(button_values);

    if (button_values[5] === "true") {
      var users = people_table.all().map(function (e) {
        return e.ID;
      });

      users.forEach((user) => {
        people_table.set(`${user}.languageCode`, button_values[2]);
        people_table.set(`${user}.gender`, button_values[3]);
        people_table.set(`${user}.name`, button_values[4]);
      });
    } else {
      people_table.set(`${button_values[1]}.languageCode`, button_values[2]);
      people_table.set(`${button_values[1]}.gender`, button_values[3]);
      people_table.set(`${button_values[1]}.name`, button_values[4]);
    }

    button.message.react("✅");
    button.message.edit(button.message.embeds[0], { components: null });
    button.reply.defer();
  },
};
