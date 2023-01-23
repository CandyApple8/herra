const fs = require("fs");

function isRegistered(id)
{
    return fs.existsSync(`${__dirname}/../users/${id}`);
}

exports.setVal = (id, val) =>
{
    //VAL_NAN = value not a number
    var data = JSON.parse(fs.readFileSync(`${__dirname}/../users/${id}/data.json`));
    data["coins"] = parseInt(val);
}

exports.changeVal = (id, val, action = "+") => 
{
    if (isNaN(val)) return "VAL_NAN";
    var data = JSON.parse(fs.readFileSync(`${__dirname}/../users/${id}/data.json`));
    if (data == "NEX") throw data;
    if (data == "NO_USER") throw "Can't find that user";
    const pVal = parseInt(val); //parsed val :D
    switch (action)
    {
        case "+":
            data["coins"] += pVal;
            break;
        case "-":
            data["coins"] -= pVal;
            break;
        case "set":
            data["coins"] = pVal;
            break;
    }
    fs.writeFileSync(`${ __dirname }/../users/${ id }/data.json`, JSON.stringify(data, null, 4));
    return "OK";
}

var cooldown = new Set();

exports.auto = (id) =>
{
    if (!isRegistered(id)) return;
    //add cooldown logic
    if (cooldown.has(id)) return;
    exports.changeVal(id, Math.round(Math.random()*10), "+");
    setTimeout(() => {
        cooldown.delete(id);
    }, Math.round(Math.random()*10000));
}