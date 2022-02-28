var db = require("quick.db");
const fs = require("fs");
const readline = require("readline");

const util = require("util");

var voices_table = new db.table("voices");

async function processLineByLine() {
  const fileStream = fs.createReadStream("voices_available.csv");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  var current_lang = "af-ZA";
  var female = [];
  var male = [];

  for await (var line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    line = line.split(",");

    if (line[0] !== current_lang) {
      voices_table.set(`${current_lang}`, { FEMALE: female, MALE: male });
      female = [];
      male = [];
    }
    current_lang = line[0];
    if (line[2] === "FEMALE") {
      female.push(line[1]);
    } else if (line[2] === "MALE") {
      male.push(line[1]);
    }
  }
  voices_table.set(`${current_lang}`, { FEMALE: female, MALE: male });
}

processLineByLine();
