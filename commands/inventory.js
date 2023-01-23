const { EmbedBuilder } = require("@discordjs/builders")
const { SlashCommandBuilder, Colors } = require("discord.js")
const fs = require("fs");

exports.mainS = (inter, ops) => 
{
    //check in main command handler "slash" if user is registered, return if not
    if (!fs.existsSync(`${__dirname}/../users/${inter.member.id}`)) return inter.reply("You can't use `inventory` because you are not registered`");

    const data = JSON.parse(fs.readFileSync(`${__dirname}/../users/${inter.member.id}/data.json`, "utf-8"));
    if (data["roles"].length < 1) return inter.reply({embeds: [new EmbedBuilder().setTitle("You don't have any colors!").setColor(Colors.Yellow)], ephemeral: true});

    //organize items
    let i = 0;
    let organized = "";
    data["roles"].forEach(role => {
        organized+=`[${++i}] \`${role}\`\n`;
    });

    inter.reply({embeds: [new EmbedBuilder()
    .setTitle("Your inventory")
    .addFields({"name": "Colors", "value": organized})
    .setColor(Colors.Orange)
    ], ephemeral: true});
}

exports.slash = new SlashCommandBuilder()
.setName("inventory")
.setDescription("View your inventory")