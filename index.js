const Discord = require("discord.js");
var db = require("quick.db");
const fs = require("fs");
const util = require("util");
const disbut = require("discord-buttons");
// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./configs_and_secrets/google_cloud.json";

const { prefix, token } = require("./configs_and_secrets/config.json");
const { url } = require("inspector");
const client = new Discord.Client();
disbut(client);
const t2s_engine = new textToSpeech.TextToSpeechClient();
var servers, langs, voices, setImg, time;

client.commands = new Discord.Collection();
client.server_commands = new Discord.Collection();
client.menu_commands = new Discord.Collection();
client.buttons_commands = new Discord.Collection();
client.image_channel = "866354544544055346";
client.home_id = "865949207609212979";
////////////////COMMAND LOADING////////////////////////////
var files_commands = fs.readdirSync("./commands/").filter((file) => file.endsWith(".js"));

for (const file of files_commands) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

files_commands = fs.readdirSync("./commands/menu_commands").filter((file) => file.endsWith(".js"));

for (const file of files_commands) {
  const command = require(`./commands/menu_commands/${file}`);
  client.menu_commands.set(command.name, command);
}

files_commands = fs.readdirSync("./commands/buttons_commands").filter((file) => file.endsWith(".js"));

for (const file of files_commands) {
  const command = require(`./commands/buttons_commands/${file}`);
  client.buttons_commands.set(command.name, command);
}

files_commands = fs.readdirSync("./commands/server_commands").filter((file) => file.endsWith(".js"));

for (const file of files_commands) {
  const command = require(`./commands/server_commands/${file}`);
  client.server_commands.set(command.name, command);
}

//////////////////////////////////////////////////////////

client.once("ready", async () => {
  console.log("Txt2Speech is online!");
  servers = new db.table("servers");
  langs = new db.table("langs");
  voices = new db.table("voices");
  setImg = new db.table("setImg");
  time = new db.table("time");

  client.user.setPresence({
    status: "online",
    activity: {
      name: "your voice. (t2s help)",
      type: "PLAYING",
    },
  });
  await new Promise((r) => setTimeout(r, 10000));
});

/////////////////////////////////////////////////////////////////////
var h;
client.on("message", async (message) => {
  if (message.content === "teste" && message.author.id === "323146644113588234") {
    setInterval(timersCheck(), 60000);
  }
  /*} else if (message.content === "teste1") {
    let message_embed = new Discord.MessageEmbed().setImage("https://cdn.discordapp.com/attachments/865949208196022314/866283514697220116/settings.png");
    h.edit("https://cdn.discordapp.com/attachments/866298833352523786/866298860330024990/set_off_on_off.png");
    return;
  }*/
  if (message.author.bot) return;
  var server_id = message.guild.id;
  if (servers.has(`${server_id}`)) {
    var uni_prefix = servers.get(`${server_id}.prefix`);
    if (message.content.startsWith(uni_prefix)) {
      const args = message.content.slice(uni_prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      switch (command) {
        case "help":
          client.commands.get("help").execute(message, servers, langs, server_id);
          break;
        case "voice_lang":
          client.commands.get("voice_lang").execute(message, servers, langs, voices, server_id);
          break;
        case "default_voice":
          client.commands.get("default_voice").execute(message, servers, langs, voices, server_id);
          break;
        case "voice":
          client.commands.get("voice").execute(message, servers, langs, server_id);
          break;
        case "quota":
          client.commands.get("quota").execute(message, servers, langs, server_id);
          break;
        case "text_lang":
          client.commands.get("text_lang").execute(message, args, servers, langs, server_id);
          break;
        case "new_prefix":
          client.commands.get("new_prefix").execute(message, args, servers, langs, server_id);
          break;
        case "set_default":
          client.commands.get("set_default").execute(message, servers, langs, server_id);
          break;
        case "remove_default":
          client.commands.get("remove_default").execute(message, servers, langs, server_id);
          break;
        case "settings":
          client.server_commands.get("settings").execute(message, servers, langs, server_id, setImg);
          break;
        default:
          var text = message.content.slice(uni_prefix.length).trim();
          client.commands.get("play").execute(message, text, servers, langs, server_id, time);
          break;
      }
    } else {
      var channel_id = message.channel.id;
      var default_id = servers.get(`${server_id}.text_chn`);

      if (channel_id === default_id) {
        client.commands.get("play").execute(message, message.content, servers, langs, server_id, time);
      }
    }
  }
});

////////////////////////////////Buttons///////////////////////////////////////////
client.on("clickButton", async (button) => {
  var button_values = button.id.split(":");
  var clicker_id = button.clicker.id;

  switch (button_values[0]) {
    case "server_configs":
    case "user_configs":
      client.commands.get("update_help").execute(button, servers, langs);
      break;
    case "confirm":
      if (button_values[1] !== clicker_id) {
        await button.reply.send("You did not initiate this interaction.", true);
        return;
      }
      client.buttons_commands.get("confirm_button").execute(button, servers, button_values);
      break;
    case "cancel":
      console.log(button_values);
      if (button_values[1] !== clicker_id) {
        await button.reply.send("You did not initiate this interaction.", true);
        console.log("teste");
        return;
      }
      button.message.edit(button.message.embeds[0], { components: null });
      button.reply.send("Command Terminated", true);
      break;
    case "set":
      if (button_values[1] !== clicker_id) {
        await button.reply.send("You did not initiate this interaction.", true);
        console.log("teste");
        return;
      }
      client.buttons_commands.get("update_settings").execute(button, servers, langs, button_values, setImg);
      button.reply.defer();
      break;
    default:
      break;
  }
});

client.on("clickMenu", async (menu_clicked) => {
  var menu_id = menu_clicked.id;
  var initiator_id = menu_clicked.values[0].split(":")[1];
  var clicker_id = menu_clicked.clicker.id;

  switch (menu_id) {
    case "lang_menu":
      if (initiator_id !== clicker_id) {
        await menu_clicked.reply.send("You did not initiate this interaction.", true);
        return;
      }
      client.menu_commands.get("gender_menu").execute(menu_clicked, servers, voices, langs);
      break;
    case "gender_menu":
      if (initiator_id !== clicker_id) {
        await menu_clicked.reply.send("You did not initiate this interaction.", true);
        return;
      }
      client.menu_commands.get("type_menu").execute(menu_clicked, servers, voices, langs);
      break;
    case "type_menu":
      if (initiator_id !== clicker_id) {
        await menu_clicked.reply.send("You did not initiate this interaction.", true);
        return;
      }
      client.menu_commands.get("confirm_menu").execute(menu_clicked, servers, voices, langs);
      break;
    case "cat_select":
      if (menu_clicked.values[0].split(":")[1] === "user") {
        client.menu_commands.get("user_menu").execute(menu_clicked, servers, langs);
      } else if (menu_clicked.values[0].split(":")[1] === "info") {
        client.menu_commands.get("info_menu").execute(menu_clicked, servers, langs);
      } else if (menu_clicked.values[0].split(":")[1] === "server") {
        client.menu_commands.get("server_menu").execute(menu_clicked, servers, langs);
      } else if (menu_clicked.values[0].split(":")[1] === "cat") {
        client.menu_commands.get("cat_menu").execute(menu_clicked, servers, langs, setImg);
      }

      break;
    default:
      break;
  }
});

//////////////////////////////////////////////////////////////////////////////////
client.on("guildCreate", (guild) => {
  var id = guild.id;
  if (!servers.has(`${server_id}`)) {
    servers.set(`${id}`, {
      name: guild.name,
      prefix: "t2s",
      text_chn: null,
      lang: "ENG",
      voice: null,
      char_number: 0,
      char_max: 40000,
      char_number_wave: 0,
      char_max_wave: 40000,
      settings: "000",
      timer: "5",
    });
  }
});

/////////////////////////////////////////////////////////////////////

function timersCheck(time) {
  var data = time.all();

  var server_timers = data.map(function (e) {
    return e.ID;
  });
  var time = Date.now();

  server_timers.forEach((server) => {
    var last_time = time.get(`${server}.lastCall`);
    var channel_id = time.get(`${server}.lastMessage`);
    var default_id = servers.get(`${server}.text_chn`);
    var lang = servers.get(`${server}.lang`);
    var timer = servers.get(`${server}.timer`) * 60000;

    if (time - last_time >= timer) {
      if (default_id !== null) {
        client.guilds.cache
          .get(server)
          .channels.cache.get(default_id)
          .send(langs.get(`${lang}.leavingP1`).concat(timer, `${langs.get(`${lang}.leavingP2`)}`));
      } else {
        client.guilds.cache
          .get(server)
          .channels.cache.get(channel_id)
          .send(langs.get(`${lang}.leavingP1`).concat(timer, `${langs.get(`${lang}.leavingP2`)}`));
      }
    }
  });
}

client.login(token);
