const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, Colors, PermissionsBitField } = require("discord.js")
const fs = require("fs");

exports.x = () =>
{

}

exports.mainS = (inter, ops) =>
{
    //? probably move to another file to make it accessible, but for now this is good. I'm pretty sure in near future this will need to be extended
    //check if user exists
    const path = `${ __dirname }/../users/${ ops[0]["value"] }`;
    if (!fs.existsSync(path)) return inter.reply({ content: "User isn't registered", ephemeral: true });

    const data = JSON.parse(fs.readFileSync(path + "/data.json", "utf-8"));
    if (data["ip"] == "not_set") return inter.reply({ content: "IP can't be scanned because its not set", ephemeral: true });

    const found = [];

    //fix this shit, its pushing all users into found
    //scan users
    fs.readdirSync(__dirname + "/../users/", "utf-8").forEach(user =>
    {
        let uIP = JSON.parse(fs.readFileSync(`${ __dirname }/../users/${ user }/data.json`), "utf-8")["ip"];
        if (uIP == data["ip"] && user !== ops[0]["value"]) 
        {
            return found.push(`<@${user}>`);
        }
    });

    inter.reply({
        embeds: [
            new EmbedBuilder()
                .setTitle("Alt scan result for `" + ops[0]["member"]["user"]["username"] + "`")
                .addFields({ name: "Size", value: found.length.toString() , inline: true },
                    { name: "IDs", value: found.length >= 1 ? found.join(" | ") : "No alts detected"})
                .setColor(found.length >= 1 ? Colors.Red : Colors.Green)
        ],
        ephemeral: true
    });
}

exports.slash = new SlashCommandBuilder()
    .setName("altscan")
    .setDescription("Find accounts with matching IPs")
    .addUserOption
    (
        op =>
            op.setRequired(true)
                .setName("user")
                .setDescription("User to scan")
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)