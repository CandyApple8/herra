const { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandStringOption } = require("discord.js")
const path = require("path");

const wordGuess = require("./games/wordGuess");
const luckyGuess = require("./games/luckyNumber");
const fs = require("fs");

exports.mainS = (inter, ops, client) =>
{
    const userData = JSON.parse(fs.readFileSync(`${ __dirname }/../users/${ inter.member.id }/data.json`, "utf-8"));

    if (parseInt(userData["coins"]) < 100) return inter.reply("You don't have enough coins to play :(\nDon't worry, it takes about 5 mins to earn 100 coins! just talk a bit :)")
    switch (ops[0]["value"])
    {
        case "wordguess":
            wordGuess.play(inter, ops);
            break;
        case "luckynumber":
            luckyGuess.play(inter, ops, client);
            break;
    }
}

exports.slash = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a game to win coins :)")
    .addStringOption(op =>
        op.setName("select_game")
            .setDescription("Select a game you want to play!")
            .addChoices(
                { name: "Word Guess", value: "wordguess" },
                { name: "Lucky Number", value: "luckynumber" })
            .setRequired(true)
    )