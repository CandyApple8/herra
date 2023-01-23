const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

exports.main = (msg, args, client) =>
{
    msg.reply(`pong :: \`${client.ws.ping}ms\``);
}

//executed only if "exports.slash" exists
exports.mainS = (inter, ops, client) =>
{
    inter.reply(`pong :: \`${client.ws.ping}ms\``);
}

exports.slash = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings the bot and returns current MS")
    .addStringOption(op =>
        op.setName("input")
            .setDescription("Arguments")
    )