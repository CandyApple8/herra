const fs = require("fs");
const _ = require("underscore");

exports.GetTime = (clean = false) =>
{
    const date = new Date();
    const data = `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`;
    return clean == false ? `[${ data }]` : data;
}

//deprecate, pm2 already logs output
exports.Log = (text, out = false) =>
{
    const data = `${ exports.GetTime() } ${ text }`;
    fs.appendFileSync(`${ __dirname }/../log/info.txt`, data + '\n');
    if (out) console.log(data);
}

exports.Info = (title, text) =>
{
    console.log(`${ exports.GetTime() } [${ title }] >> ${ text }`);
}

exports.Init = () =>
{
    const date = new Date().toString().split(" ").slice(0, 5).join(" ");
    const data = `\n==== Log started: ${ date } ====\n`;
    fs.appendFileSync("./log/info.txt", data);
}