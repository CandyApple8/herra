const { EmbedBuilder } = require("@discordjs/builders");
const { Colors } = require("discord.js");

const fs = require("fs");

const channelID = "1052650880480059402";

function embed(member)
{
    const embed = new EmbedBuilder()
    .setTitle(`\`${member.user.username}\` has left the server`)
    .addFields({name: "Tag", value: `<@${member.id}>`})
    .setColor(Colors.Red)
    return embed;
}

exports.main = (member, client) =>
{
    client.channels.cache.get(channelID).send({embeds: [embed(member)]});
}