const fs = require("fs");

exports.main = (msg, args) =>
{
    if (args.length < 1) return msg.reply("Missing arugment");

    let data = JSON.parse(fs.readFileSync(__dirname + "/../config.json", "utf-8"));
    data["prefix"] = args[0];

    fs.writeFileSync(__dirname + "/../config.json", JSON.stringify(data, null, 4));

    msg.relpy("Prefix set to: " + args[0]);
}

exports.sys = true;