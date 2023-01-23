const { sessionID, Main } = require("./events/clientReady");
const commandHandler = require("./commandHandler");
const fs = require("fs");

exports.HALT = false;

let prefix = fs.existsSync("./debug") ? "_sys" : "sys";

exports.handler = (msg, client) => 
{
    //const args = msg.content.split(" ").slice(1);
    if (msg.content.toLowerCase() == `${prefix}.halt ${ sessionID }` && msg.author.id == "1013371901277651045")
    {
        exports.HALT = !exports.HALT;
        return msg.reply(`Halt set to \`${ exports.HALT }\` for session \`${ sessionID }\``);
    }
    if (exports.HALT == true) return;

    //pushing slash commands
    if (msg.content == `${prefix}.update` && msg.member.id == msg.guild.ownerId)
    {
        //clear commands
        msg.channel.send("Clearing old cache...");
        msg.guild.commands.set([]);
        msg.guild.commands.set(commandHandler._commands[1]);
        return msg.channel.send(`Updated ${ Object.keys(commandHandler._commands[1]).length } commands`);
    }
}