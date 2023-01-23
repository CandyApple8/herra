const fs = require("fs");

exports.get = (key = null) =>
{
    const data = JSON.parse(fs.readFileSync(__dirname+"/../config.json", "utf-8"));
    return key == null ? data : data[key];
}