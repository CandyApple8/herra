const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { Colors, ButtonStyle } = require("discord.js");

function newColor(msg, roleId, price)
{
    const role = msg.guild.roles.cache.get(roleId);
    if (role == undefined) return msg.reply("Failed to build shop, roleID missmatch\nFix the code dumbass\nID Given: `" + roleId + "`");
    const row = new ActionRowBuilder()
        .addComponents
        (
            new ButtonBuilder()
                .setCustomId(`buyColor-${roleId}-${price}`)
                .setStyle(ButtonStyle.Success)
                .setLabel("Buy")
        )
    msg.channel.send({
        embeds: [new EmbedBuilder()
            .addFields
            (
                { name: "Color", value: `<@&${ roleId }>`, inline: true },
                { name: "Price", value: `${ price } coins`, inline: true },
            )
            .setColor(Colors.Green)
        ],
        components: [row]
    });
}

exports.main = (msg, args, client) =>
{
    //red
    newColor(msg, "1036953729859072000", 5000);
    //green
    newColor(msg, "1036953889943081071", 7000);
    //blue
    newColor(msg, "1036953877490171985", 10000);
    //yellow
    newColor(msg, "1056288688742596719", 15000);
    //purple
    newColor(msg, "1037479762182017107", 30000);
    //cyan
    newColor(msg, "1037479764673441892", 45000)
    //black
    newColor(msg, "1037479762932809748", 60000);
    //pink
    newColor(msg, "1037479761955524710", 70000);
}

exports.sys = true;