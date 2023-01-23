const fs = require("fs");

exports.main = (msg) =>
{
    msg.channel.send("Working on it...").then(r =>
    {
        console.log("Reading user directory...");
        let x = 0;
        
        fs.readdirSync(`${ __dirname }/../users/`, "utf-8").forEach(user =>
        {
            x++;
            console.log("Clearing userID: " + user);
            let data = JSON.parse(fs.readFileSync(`${ __dirname }/../users/${ user }/data.json`, "utf-8"));
            data["roles"] = [];
            data["coins"] = 500;
            console.log("Writing data...");
            fs.writeFileSync(`${__dirname}/../users/${user}/data.json`, JSON.stringify(data, null ,4));
            console.log(("Finished!"));
        });
        r.edit("Finished, user count: " + x.toString());
    });
}

exports.sys = true;