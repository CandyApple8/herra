const fs = require("fs");

exports.main = (msg, args, client) =>
{
    //iterate users
    let i = 0;
    msg.channel.send("Scanning user database...")
    fs.readdirSync(`${ __dirname }/../users`, "utf-8").forEach(user =>
    {
        let oldData = JSON.parse(fs.readFileSync(`${ __dirname }/../users/${ user }/data.json`, "utf-8"));
        if (!oldData["roles"]) oldData["roles"] = [];

        console.log("Updated userID: " + user);
        
        fs.writeFileSync(`${ __dirname }/../users/${ user }/data.json`, JSON.stringify(oldData, null, 4));
        i++;
    });

    msg.channel.send("Updated `" + i.toString() + "` users.");
}

exports.sys = true;