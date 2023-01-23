const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs");

exports.mainS = (inter, ops, client) =>
{
    let index = ops[0]["value"];
    let action = ops[1]["value"];

    const data = JSON.parse(fs.readFileSync(`${ __dirname }/../users/${ inter.member.id }/data.json`, "utf-8"));
    if (index > data["roles"].length) return inter.reply({
        content: "Item number you entered seems wrong, use `/inventory` to see items numbers\nAccess items by number, for example: `/equip 1` is going to equip the first in your inventory",
        ephemeral: true
    });

    const rl = data["roles"][--index];

    const role = inter.guild.roles.cache.find(r => r.name === rl);

    if (action)
    {
        inter.member.roles.add(role);
        inter.reply({ content: `<@&${ role.id }> added!`, ephemeral: true });
    } else
    {
        inter.member.roles.remove(role);
        inter.reply({ content: `<@&${ role.id }> removed!`, ephemeral: true });
    }
}

exports.slash = new SlashCommandBuilder()
    .setName("equip")
    .setDescription("Equip / Uneqip an item")
    .addIntegerOption(op =>
        op.setName("item_number")
            .setDescription("View your items with /inventory command")
            .setRequired(true)
            .setMinValue(1)
    )
    .addBooleanOption(op =>
        op.setName("action")
            .setDescription("true = add, false = remove")
            .setRequired(true)
    )