exports.main = (msg, args) =>
{
    const role = msg.guild.roles.cache.find(r => r.name === "member");
    let x = 0;
    let ids = [];
    msg.guild.members.cache.forEach(member => 
    {
        if (!member.roles.cache.has(role))
        {
            if (member.permissions.has("Administrator")) return;
            if (member.bot) return;
            x++;
            ids.push(member.id);
        }
    });

    return msg.channel.send(`Found \`${x}\` members without a member role`);
}

exports.usage = "`nrscan <bool?>\nwhen bool is true a text file with IDs will be sent in chat`";
exports.info = "Scans and returns members without a role, member IDs will be saved to a text file, has ability to send the file in chat";

exports.admin = true;