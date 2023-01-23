const fs = require("fs");

const Discord = require("discord.js");

function debug() 
{
    return fs.existsSync(__dirname+"/../debug");
}

exports.main = (reaction, user) => 
{
    if (reaction.message.id !== "1052713687670079499") return;
    //if debug mode: allow only shux to execute
    if (debug() && user.id !== "1013371901277651045") return;

    //if reaction added already, stop the duplication of channels
    if (require("../server/main").vpending.has(user.id)) return console.log("Channel already exists");
    require("../server/main").vpending.add(user.id)

    //not needed, we add it to a variable now :)
    //fs.writeFileSync(`./verificationPending/${ user.id }.x`, "");

    const embed = new Discord.EmbedBuilder()
        .setTitle(`Hi, ${ user.username }!`)
        .setColor(Discord.Colors.Orange)
        .setDescription(`${ debug() ? "**DEBUG**" : "" } To get verified simply press the hyperlink bellow!\nIf you run into any issues try reacting again or DM <@1013371901277651045> for help`)
        .addFields({ name: "Verification link", value: `[Click me](http://${ debug() ? "localhost" : "162.248.100.54" }:6661/?id=${ user.id })` });

    user.send({ embeds: [embed] }).catch(err =>
    {
        {
            client.guilds.cache.first().channels.create({
                "name": user.id, permissionOverwrites: [
                    {
                        id: client.guilds.cache.first().id,
                        deny: "ViewChannel"
                    },
                    {
                        id: user.id,
                        allow: "ViewChannel"
                    }
                ]
            }).then(r => { r.send({ embeds: [embed] }) });
        }
    });
}