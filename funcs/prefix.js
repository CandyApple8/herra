const fs = require("fs");
const { Log } = require("./log");
var PREFIX = getPrefix()

exports.prefix = () =>
{
    return PREFIX;
}

function getPrefix()
{
    return JSON.parse(fs.readFileSync(`${ __dirname }/../config.json`, "utf-8"))["prefix"];
}

fs.watchFile(`${ __dirname }/../config.json`, () =>
{
    if (getPrefix() == PREFIX) return;
    Log(`Prefix updated from ${ PREFIX } to ${ getPrefix() }`, true);
    PREFIX = getPrefix()
});