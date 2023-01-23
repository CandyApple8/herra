const { SlashCommandBuilder, SlashCommandStringOption, EmbedBuilder, Colors } = require("discord.js")
const coinSystem = require("../coinSystem/handler");
const fs = require("fs");
const inventoryManager = require("../inventoryManager");

exports.main = () =>
{

}

function getCoins(id)
{
    const usrpath = __dirname + "/../users/" + id;
    if (!fs.existsSync(usrpath)) return "no_user";
    return JSON.parse(fs.readFileSync(`${ usrpath }/data.json`, "utf-8"))["coins"];
}

const colors = {
    "Red": "5000",
    "Blue": "7000",
    "Green": "10000",
    "Yellow": "15000",
    "Purple": "20000",
    "Cyan": "30000",
    "Black": "39000",
    "Pink": "50000"
}

function embed(text, color)
{
    return new EmbedBuilder()
        .setTitle(text)
        .setColor(color)
}

exports.mainS = (inter, ops, client) =>
{
    //get user coins
    const coins = getCoins(inter.member.id);
    if (coins == "no_user") return inter.reply("You can't use shop because you are not registered");
    //inter.channel.send("[DEBUG]\nColor selected: " + ops[0]["value"]+`\nColor price: \`${colors[ops[0]["value"]]}\`\nUser coins: ${coins}`)

    //check if user has enough coins
    let needed = parseInt(colors[ops[0]["value"]]) - parseInt(coins);

    if (parseInt(coins) < parseInt(colors[ops[0]["value"]])) return inter.reply({ embeds: [embed(`You need \`${ needed }\` more coins to buy color \`${ ops[0]["value"] }\``, Colors.Red)], ephemeral: true });

    //get the role
    //convert role to role name
    const realColor = "color_" + ops[0]["value"].toLowerCase();
    const role = client.guilds.cache.first().roles.cache.find(r => r.name === realColor);

    //check if user already has the role
    if (JSON.parse(fs.readFileSync(`${ __dirname }/../users/${ inter.member.id }/data.json`))["roles"].includes(realColor)) return inter.reply({ embeds: [embed("You already have color `" + ops[0]["value"] + "`!", Colors.Yellow)], ephemeral: true });

    //add role to inventory
    inventoryManager.manageRole(inter.member.id, realColor, "add");

    //equip a role
    inter.member.roles.add(role);

    //remove coins
    coinSystem.changeVal(inter.member.id, parseInt(colors[ops[0]["value"]]), "-");
    inter.reply({ embeds: [embed("You purchased color `" + ops[0]["value"] + `\` for \`${ colors[ops[0]["value"]] }\` coins!`, Colors.Green)] });
}



var opsBuilder = new SlashCommandStringOption();
Object.keys(colors).forEach(key =>
{
    opsBuilder.addChoices({ "name": `${ key } - ${ colors[key] }c`, value: `${ key }` })
});

opsBuilder.setRequired(true)
opsBuilder.setName("color")
opsBuilder.setDescription("Select the color you want to buy!")

exports.slash = new SlashCommandBuilder()
    .setName("buycolor")
    .setDescription("Color you want to buy :)")
    .addStringOption(opsBuilder)