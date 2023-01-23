const fs = require("fs");
const user = require("./user");

function compareIP(userX, userY)
{
    const IPuserX = user.get(userX, "ip");
    const IPuserY = user.get(userY, "ip");

    const result = false;

    result = IPuserX == IPuserY;

    return result;
}

function scanIP(id)
{
    //it obviously take longer to scan the more users there are
    console.log("Scanning ips...");
    var _user = user.get(id, "ip");
    if (_user == "NO_USER") return ["no_user"];
    var found = [];

    fs.readdirSync(__dirname + "/../users/", "utf-8").forEach(usr =>
    {
        if (usr == id) return; //ignore self
        const uData = JSON.parse(fs.readFileSync(__dirname + "/../users/" + usr + "/data.json", "utf-8"));
        if (uData["ip"] == toScan) {
            found.push(usr)
        }
    });

    return found;
}

exports._scanIP = scanIP;
exports._compareIP = compareIP;