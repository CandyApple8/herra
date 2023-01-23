const { EmbedBuilder } = require("@discordjs/builders");
const { Colors } = require("discord.js");
const { Log } = require("../funcs/log");
const { GetTime } = require("../funcs/log");
const fs = require("fs");

function _embed(member)
{
    return new EmbedBuilder()
        .setTitle(`\`${ member.user.username }\` joined the server!`)
        .addFields({ name: "Tag", value: `<@${ member.id }>` })
        .setColor(Colors.Green);
}

exports.main = (member, client) =>
{
    if (member.user.bot)
    {
        //bot
        member.roles.add(member.guild.roles.cache.find(r => r.name === "bot"));
        return client.channels.cache.get("1019671761584926743").send("`Bot` <@" + member.id + "> joined, role added")
    }
    client.channels.cache.get("1052650850226556958").send({ embeds: [_embed(member)] });
    //client.channels.cache.get("1019671761584926743").send({ content: `||<@${ member.id }>||`, embeds: [embed] });
}