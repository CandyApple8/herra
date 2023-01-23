const user = require("./funcs/user");
const inventoryManager = require("./inventoryManager");
const coinSystem = require("./coinSystem/handler");
const { debug } = require("./funcs/util");

exports.main = (inter) =>
{
    if (debug && inter.member.id !== inter.guild.ownerId) return;
    const userData = user.get(inter.member.id);
    const color = inter.guild.roles.cache.get(inter.customId.split("-")[1]);
    const price = inter.customId.split("-")[2];
    const userCoins = userData.coins;

    if (parseInt(userCoins) < parseInt(price))
    {
        return inter.reply({ content: `You need \`${ parseInt(price) - parseInt(userCoins) }\` more coins to buy color <@&${ color.id }>`, ephemeral: true });
    }

    if (userData.roles.includes(color.name)) return inter.reply({ content: `You already have <@&${ color.id }>`, ephemeral: true });

    inventoryManager.manageRole(inter.member.id, color.name, true);
    coinSystem.changeVal(inter.member.id, inter.customId.split("-")[2], "-");
    inter.member.roles.add(color);
    inter.reply({ content: `You purchased <@&${ color.id }> for \`${ price }\` coins`, ephemeral: true })
}