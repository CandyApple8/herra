//load env vars
require("dotenv").config();
require("./server/main");
require("./ws/main").main();

const Discord = require("discord.js");
const log = require("./funcs/log");
const { Log, Info } = require("./funcs/log");
const client = new Discord.Client({ intents: [3276799] });
const coins = require("./coinSystem/handler");
const fs = require("fs");
const { Main } = require("./events/clientReady");
const newMemberEvent = require("./events/newMember");
const errorEvent = require("./events/error");
const memberRemoveEvent = require("./events/memberRemove");
const messageReactionAddEvent = require("./events/messageReactionAdd");
const shopHandler = require('./shopHandler');
const sysCmds = require("./sys_cmds");

log.Init();

const commandHandler = require("./commandHandler");

commandHandler.Init();

exports.getuser = (id) =>
{
    return client.users.cache.get(id);
}

exports.client = client;

client.on("ready", () =>
{
    //initializes client id and other stuff, clientReady.js
    Main(client);
    client.channels.cache.get("1052712693188010116").messages.fetch("1052713687670079499").then(m =>
    {
        //var x = m.createReactionCollector();
    });
    //client.channels.cache.get("1052712693188010116").messages.fetch()
});

function debug()
{
    return fs.existsSync("./debug");
}

client.on("guildMemberRemove", (member) =>
{
    //remove id from pending, to prevent error 😎
    require("./server/main").vpending.delete(member.id);
    if (debug()) return;
    memberRemoveEvent.main(member, client);
});

client.on("guildMemberAdd", (member) =>
{
    if (debug()) return;
    newMemberEvent.main(member, client);
});

client.on("messageReactionAdd", (reaction, user) =>
{
    messageReactionAddEvent.main(reaction, user);
});

client.on("error", (err) =>
{
    errorEvent.main(err, client)
});

client.on("presenceUpdate", (member) =>
{
    //client.channels.cache.get("1053932589611761734").send(`${member.user.username} is now \`${member.status}\``);
});

client.on("messageCreate", (msg) =>
{
    //halting session and other hardcoded commands
    //only accessivle by me
    if (msg.author.bot) return;
    if (msg.member.id == msg.guild.ownerId && msg.content.startsWith(debug() ? "_sys" : "sys")) sysCmds.handler(msg);
    coins.auto(msg.member.id);
    commandHandler.Handle(msg, client);
});

client.on("interactionCreate", interaction =>
{
    //make crates.json if it doesn't exist
    if (interaction.isModalSubmit()) 
    {

    }
    if (interaction.isButton())
    {
        return shopHandler.main(interaction);
    }
    if (!interaction.isChatInputCommand()) return;
    commandHandler.HandleInt(interaction, client);
});

client.login
    (
        debug() ?
            process.env.debugToken :
            process.env.token
    );