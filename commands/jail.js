const { SlashCommandBuilder } = require("discord.js");

exports.main = (msg, args) => 
{

}

exports.mainS = (inter, ops) =>
{
    const jailRole = inter.guild.roles.cache.find(r => r.name === "jailed");
    const memberRole = inter.guild.roles.cache.find(r => r.name === "member");

    ops[0].roles.add(jailRole);
    ops[0].roles.remove(memberRole);

    inter.reply("Filthy little goblin sent behind bars 😎");
}

exports.slash = new SlashCommandBuilder()
.setName("jail")
.setDescription("Jail a dirty little goblin")
.addUserOption(op => 
    op.setRequired(true)
    .setDescription("Goblin to jail")
    .setName("goblin")
    )
.addIntegerOption(op =>
    op.setName("time")
    .setDescription("Time in minutes")
    .setRequired(true)
    )

exports.admin = true;