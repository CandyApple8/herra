const { EmbedBuilder } = require("@discordjs/builders");
const { Colors } = require("discord.js");
const { Log, Info } = require("../funcs/log");
const { GetTime } = require("../funcs/log");
const fs = require("fs");

const { ActivityType } = require("discord.js");

exports.sessionID = Math.round(Math.random() * 10000)
exports.debug = fs.existsSync(__dirname + "/../debug");

const embed = new EmbedBuilder()
    .setTitle("Client ready")
    .addFields({
        "name": "Start time",
        value: "`" + GetTime(true).toString() + "`", inline: true
    },
        { name: "Session ID", value: `\`${ exports.sessionID.toString() }\`` },
        { name: "Mode", value: `\`${ exports.debug ? "Debug" : "Release" }\`` })
    .setColor(exports.debug ? Colors.Yellow : Colors.Green);

const aTypes = [ActivityType.Playing, ActivityType.Watching, ActivityType.Listening];

exports.Main = (client) =>
{
    Info("Client", "ready!");
    //save rpc
    let data = JSON.parse(fs.readFileSync(__dirname + "/../config.json", "utf-8"));
    client.user.setActivity({ "name": data["rpc"]["text"] }, { type: aTypes[data["rpc"]["type"]] });

    client.guilds.cache.first().channels.cache.get("1038453507646300190").send({ embeds: [embed] });
}