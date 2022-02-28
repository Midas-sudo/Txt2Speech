const util = require("util");
const fs = require("fs");
var db = require("quick.db");
const textToSpeech = require("@google-cloud/text-to-speech");
const t2s_engine = new textToSpeech.TextToSpeechClient();
module.exports = {
  name: "play",
  description: "Play voice",
  async execute(message, text, servers, langs, server_id, time) {
    var client = message.client;
    var lang = servers.get(`${server_id}.lang`);

    var settings = servers.get(`${server_id}.settings`).split("");
    var user = message.member;
    var user_voice_state_id = user.voice.channelID;
    var user_state = user.voice.deaf;
    console.log(user_voice_state_id);

    if (user_voice_state_id === undefined || user_voice_state_id === null) {
      if (settings[1] === "0" || (settings[1] === "2" && !message.member.hasPermission("MANAGE_GUILD"))) {
        message.author.send(`${langs.get(`${lang}.notInChannel`)}`, true);
        return;
      } else {
        var collection = client.voice.connections;
        var temp = Object.fromEntries(collection);
        console.log(temp[server_id].channel.id);
        if (temp[server_id] !== undefined) user_voice_state_id = temp[server_id].channel.id;
        if (user_voice_state_id === undefined || user_voice_state_id === null) {
          message.author.send(`${langs.get(`${lang}.botnotInChannel`)}`, true);
          return;
        }
      }
    } else if (user_state && (settings[0] === "0" || (settings[0] === "2" && !message.member.hasPermission("MANAGE_GUILD")))) {
      message.author.send(`${langs.get(`${lang}.deafenInChannel`)}`, true);
      return;
    }

    var people_table = new db.table(["P", server_id].join(""));

    var user_id = message.author.id;
    console.log(user_id);
    //VOICE CONFIGS//
    var languageCode = people_table.get(`${user_id}.languageCode`);
    var name = people_table.get(`${user_id}.name`);
    var gender = people_table.get(`${user_id}.gender`);

    var default_numb = servers.get(`${server_id}.char_number`);
    var wavenet_numb = servers.get(`${server_id}.char_number_wave`);
    var default_max = servers.get(`${server_id}.char_max`);
    var wavenet_max = servers.get(`${server_id}.char_max_wave`);
    var type_sep = languageCode.split("-");

    const comp = (element) => element == "Wavenet";
    console.log(type_sep, type_sep.findIndex(comp));
    if (type_sep.findIndex(comp) === -1 && default_numb >= default_max) {
      message.channel.send(`${langs.get(`${lang}.defaultLimitReached`)}`);
      return;
    } else if (type_sep.findIndex(comp) !== -1 && wavenet_numb >= wavenet_max) {
      message.channel.send(`${langs.get(`${lang}.wavenetLimitReached`)}`);
      return;
    }

    if (languageCode == null || name == null || gender == null) {
      people_table.set(`${user_id}.languageCode`, "en-GB");
      people_table.set(`${user_id}.name`, "en-GB-Standard-A");
      people_table.set(`${user_id}.gender`, "FEMALE");

      languageCode = "en-GB";
      name = "en-GB-Standard-A";
      gender = "FEMALE";
    }

    //AUDIO CONFIGS//
    var speakingRate = people_table.get(`${user_id}.speakingRate`);
    var pitch = people_table.get(`${user_id}.pitch`);
    var volumeGainDb = people_table.get(`${user_id}.volumeGainDb`);

    if (speakingRate == null || pitch == null || volumeGainDb == null) {
      people_table.set(`${user_id}.speakingRate`, 1);
      people_table.set(`${user_id}.pitch`, 0);
      people_table.set(`${user_id}.volumeGainDb`, 0.0);
      speakingRate = 1;
      pitch = 0;
      volumeGainDb = 0.0;
    }

    // Construct the request
    const request = {
      input: {
        ssml: `<speak>${text}</speak>`,
      }, //<speak>O Fábio é mesmo mau amigo por dar ideias de projectos a meio do semestre <prosody rate='fast'>seu</prosody> <prosody rate='x-fast'>tchóla</prosody>.</speak>
      voice: {
        languageCode: languageCode,
        name: name,
        ssmlGender: gender,
      },
      audioConfig: {
        audioEncoding: "MP3",
        speakingRate: speakingRate,
        pitch: pitch,
        volumeGainDb: volumeGainDb,
      },
    };

    // Performs the text-to-speech request
    const [response] = await t2s_engine.synthesizeSpeech(request);

    client.commands.get("add_char").execute(text, servers, server_id, name);

    //var beeb = new Audio(`data:audio/ogg;base64,${response}`);

    //Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    name = Date.now();
    await writeFile(`./audios/${name}.mp3`, response.audioContent, "binary");
    console.log("Audio content written to file: output.mp3");

    client.guilds.cache
      .get(server_id)
      .channels.cache.get(user_voice_state_id)
      .join()
      .then((connection) => {
        console.log("Successfully connected.");
        var dispatcher = connection.play(`./audios/${name}.mp3`);

        time.set(`${server_id}.lastCall`, name);
        time.set(`${server_id}.lastMessage`, message.channel.id);
      });
  },
};
