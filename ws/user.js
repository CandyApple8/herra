const fs = require("fs");

exports.get = (id, key=null) => 
{
    if (!fs.existsSync(`${__dirname}/../users/${id}`)) return "no_user";
    
    const data = JSON.parse(fs.readFileSync(`${__dirname}/../users/${id}/data.json`, "utf-8"))
    if (key != null)
    {
        if (data[key] == undefined) return "no_key";
        return data[key];
    }
    return data;
}