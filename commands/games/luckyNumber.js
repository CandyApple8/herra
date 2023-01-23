const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders")
const { ButtonStyle } = require("discord.js")
const fs = require("fs");
const cs = require("../../coinSystem/handler");
exports.play = (inter, ops, client) =>
{
    const number = Math.round(Math.random()*15)
    inter.reply("Guess a number between `1` and `15` to win `1500` coins!\nYou have 3 tries and 1 minute");
    const collector = inter.channel.createMessageCollector({ time: 60000 , max: 4})

    let succ = false;

    collector.on("collect", (msg) => 
    {
        if (msg.member.id !== inter.member.id) return;
        if (succ == true) return;
        if (parseInt(msg.content) === number) 
        {
            succ = true;
            cs.changeVal(msg.member.id, 1100, "+");
            return msg.reply("You got it right!\n`1500` coins added to your balance :)")
        }
        return msg.react("❌");
    });

    collector.on("end", () =>
    {
        if (succ == false) inter.channel.send(`<@${ inter.member.id }> Out of time/attempts :( you lost \`100\` coins\nThe number was: \`${ number }\``);
    });
}