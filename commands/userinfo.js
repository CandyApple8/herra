const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const path = require("path");
const fs = require("fs");
const request = require("request");
const user = require("../funcs/user");

exports.mainS = (inter, ops) =>
{
    var userData = user.get(ops[0].value);
    inter.reply({ content: "Getting info...", ephemeral: true }).then(async () =>
    {
        if (userData == "nouser") return inter.editReply({ content: "User not registered", ephemeral: true });

        let ip = "not set";
        if (userData.ip !== "not_set")
        {
            //get only the last index
            ip = userData["ip"].split(":").pop();
        }

        const embed = new EmbedBuilder()
            .setTitle(`${ ops[0].member.user.username }'s info`)
            .addFields({ name: "IP", value: `\`${ ip }\`` },
                { name: "coins", value: `\`${ userData.coins }\`` },
                { name: "Created at", value: ops[0].member.user.createdAt.toString() })
            //make it so feils bellow are added if ip exists
            .setColor("Green");

        if (ip === "not set") return inter.editReply({ embeds: [embed], ephemeral: true });

        let url = `https://api.findip.net/${ ip }/?token=fda44312519a4065b4066fe7806ad4ab`;
        request(url, { json: true }, (err, reason, body) =>
        {

            const IPData = body;
            let country = IPData.country?.names.en;
            let continent = IPData.continent?.names.en;
            let city = IPData.city?.names.en;
            let postalCode = IPData.postal?.code;
            let ISP = IPData.traits?.isp;
            let connectionType = IPData.traits?.connection_type;

            embed.addFields({
                name: "IP Data", value: `Country: \`${ country }\`\nCity: \`${ city }\`\nData type: \`${ connectionType }\`\nPostal code: \`${ postalCode }\`\nISP: \`${ ISP }\`\nContinent: \`${ continent }\``
            },
            {name: "Consider using this tool for more precise info", value: `https://whatismyipaddress.com/ip/${ip}`});

            inter.editReply({ content: "Finished gathering data", embeds: [embed], ephemeral: true });
        });
    });
}

exports.sys = true;
exports.slash = new SlashCommandBuilder()
    .setName(path.basename(__filename, path.extname(__filename)))
    .setDescription("View user details")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addUserOption(op =>
        op.setName("user")
            .setDescription("Target user")
            .setRequired(true)
    )