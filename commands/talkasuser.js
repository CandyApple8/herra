const { SlashCommandBuilder, WebhookClient } = require("discord.js");

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.mainS = (inter, ops) =>
{
    console.log(ops[0])
    const params =
    {
        username: ops[0]["user"]["username"],
        content: ops[1]["value"],
        avatar_url: ops[0].user.avatar
    }

    fetch("https://discordapp.com/api/webhooks/1058772840859570319/t60tMADp3ShjMw3c4fQvvIZ0GicZaMcHPlF_cSLqTmOaeUy2dCIJlDtoV3GJEPgEZ4Q2", 
    {
        method: "POST",
        headers: 
        {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(params)
    });
}

exports.slash = new SlashCommandBuilder()
    .setName("talkasuser")
    .setDescription("Talk in a channel as user :)")
    .addUserOption(op =>
        op.setName("user")
            .setDescription("User to talk as")
            .setRequired(true)
    )

    .addStringOption(op =>
        op.setName("text")
            .setDescription("Text to send")
            .setRequired(true)
    )

exports.sys = true;