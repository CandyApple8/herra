const fs = require("fs");
const { prefix } = require("./funcs/prefix");
const { Info, Log } = require("./funcs/log");
const { debug } = require("console");

let commands = {};
let slashCommands = [];

let commandsObject_keys = null;

//easy to make dynamic, just make sure value updates when config file is changed
const sysIds = JSON.parse(fs.readFileSync("./config.json", "utf-8"))["sys_ids"];

exports.Init = function () {
    fs.readdirSync(`./commands`, "utf-8").forEach(file => {
        if (!file.endsWith(".js")) return;
        const clean = file.slice(0, file.length - 3);
        Info("Command loader", `Loading ${clean}`);
        //make all exprots from the file avaliableF
        commands[clean] = require(`./commands/${file}`);
        //if command contains "slash" export
        if (commands[clean]["slash"]) slashCommands.push(commands[clean]["slash"]);
    });
    Info("Command loader", `Loaded ${Object.keys(commands).length} commands`);
    //good to avoid Object.keys(commands) in events
    commandsObject_keys = Object.keys(commands);
}

let cmdCooldown = new Set();
let cmdWarning = {};
//handle text commands

function handleCooldown(id, isAdmin, msg) {
    if (isAdmin) return "ok";
    //set cooldown on normal users to prevent command abuse, doesnt work on admins
    //probably make this a fucntion
    if (cmdCooldown.has(id)) return msg.react("⏳");
    cmdCooldown.add(msg.member.id);
    setTimeout(() => {
        cmdCooldown.delete(id);
    }, 1500);
    return "ok";
}

exports.Handle = (msg, client) => {
    if (!msg.content.startsWith(prefix())) return;
    //replace extra spaces with 1 space :) (epic regex moment?) | slice removes cmd lol
    const args = msg.content.replace(/ +/g, ' ').split(" ").slice(1);
    const cmd = msg.content.split(" ")[0].slice(prefix().length);

    const isAdmin = msg.member.permissions.has("Administrator");

    if (cmd.startsWith(debug() ? "_sys" : "sys") && isAdmin()) 
    {
        
    }
    if (commandsObject_keys.includes(cmd)) {
        if (handleCooldown(msg.member.id, isAdmin, msg) != "ok") return;

        //reading Sys IDs can be improved easily, but for now this is fine
        const _cmd = commands[cmd];
        if (_cmd["sys"] && !sysIds.includes(msg.member.id)) return msg.react(msg.guild.emojis.cache.find(r => r.name === "clownge"))
        if (_cmd["admin"] && !msg.member.permissions.has("Administrator")) return msg.reply("no 😎");
        if (_cmd["owner"] && msg.member.id !== "1013371901277651045") return msg.reply("nope");

        Info("Command Handler -text", `${cmd} executed by ${msg.member.user.username} (${msg.member.id})`);
        //execute command 
        commands[cmd].main(msg, args, client);
    }
}

//handle interactions
exports.HandleInt = (interaction, client) => {
    //check user data validity
    if (!fs.existsSync(`./users/${interaction.member.id}`)) return interaction.reply("You are not registered and can't use commands, contact owner to fix this");
    const ops = interaction.options["_hoistedOptions"];
    if (commandsObject_keys.includes(interaction.commandName)) {
        Info("Command handler -slash", `${interaction.commandName} executed by ${interaction.member.user.username} (${interaction.member.id})`)
        commands[interaction.commandName].mainS(interaction, ops, client)
    }
}


exports._commands = [commands, slashCommands];