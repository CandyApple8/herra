 const { SlashCommandBuilder, ActivityType, PermissionFlagsBits } = require("discord.js");
const fs = require("fs");

exports.main = () =>
{

}

const aTypes = [ActivityType.Playing, ActivityType.Watching, ActivityType.Listening];

exports.mainS = (inter, ops, client) =>
{
    var type = aTypes[ops[1]["value"]];
    client.user.setActivity({ "name": ops[0]["value"]}, { type: type });
    inter.reply({content: "Activity updated", ephemeral: true});
    //save rpc
    var oldData = JSON.parse(fs.readFileSync(__dirname+"/../config.json", "utf-8"));
    oldData["rpc"]["text"] = ops[0]["value"];
    oldData["rpc"]["type"] = ops[1]["value"];

    fs.writeFileSync(__dirname+"/../config.json", JSON.stringify(oldData, null, 4));
}

exports.sys = true;
exports.slash = new SlashCommandBuilder()
    .setName("status")
    .setDescription("Set status")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(op =>
        op.setName("text")
            .setRequired(true)
            .setMinLength(2)
            .setDescription("Activity text")
    )
    .addStringOption(op =>
        op.addChoices(
            { "name": "Playing", "value": "0" },
            { "name": "Watching", "value": "1" },
            { "name": "Listening", "value": "2" }
        )
        .setDescription("Activity type")
        .setRequired(true)
        .setName("type")
    );
