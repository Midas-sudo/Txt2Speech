module.exports = {
  name: "add_char",
  description: "Adds chars ",
  async execute(message, servers, server_id, type) {
    var length = message.length;
    var type_sep = type.split("-");

    const comp = (element) => element == "Wavenet";
    console.log(type_sep, type_sep.findIndex(comp));
    if (type_sep.findIndex(comp) === -1) {
      servers.add(`${server_id}.char_number`, length);
    } else {
      servers.add(`${server_id}.char_number_wave`, length);
    }
  },
};
