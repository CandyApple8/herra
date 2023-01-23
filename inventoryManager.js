const fs = require("fs");

exports.manageRole = (id, roleName, action=true) =>
{
    if (!fs.existsSync(`./users/${id}/data.json`)) return "no_usr";

    let oldData = JSON.parse(fs.readFileSync(`./users/${id}/data.json`, "utf-8"));

    action ? oldData["roles"].push(roleName) : oldData["roles"] = oldData["roles"].filter(x => x !== roleName)
    //true

    fs.writeFileSync(`./users/${id}/data.json`, JSON.stringify(oldData, null, 4));
    return "ok";
}