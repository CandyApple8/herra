const fs = require("fs");
const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const user = require("../funcs/user");

exports.main = (user) => 
{

}

function embed(username, coins)
{
    return new EmbedBuilder()
    .setTitle(`${username}'s coins: \`${coins}\``)
    .setColor("Green")
}

exports.mainS = (inter, ops) => 
{

    const res = user.get(ops[0].value, "coins");
    //const path = `${ __dirname }/../users/${ ops[0]["value"] }`;
    if (res == "nouser") return inter.reply("User not registered");

    //make it embed so its prettier
    return inter.reply({
        embeds: [embed(ops[0]["user"]["username"], res.toString())],
        ephemeral: ops[1] !== undefined ? ops[1]["value"] : true
    });
}

exports.slash = new SlashCommandBuilder()
    .setName("coins")
    .setDescription("View user's coin balance")
    .addUserOption(op =>
        op.setName("user")
            .setDescription("Select user")
            .setRequired(true)
    )
    .addBooleanOption(op =>
        op.setName("private")
            .setDescription("Set to FALSE if you want everyone to see the output")
    )