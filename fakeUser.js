const fs = require("fs");

for (var x = 0; x < 10; x++)
{
    const data = {
        "ip": (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255)).toString(),
        "coins": Math.round(Math.random()*1000)
    }

    const uid = `${Math.round(Math.random()*9999999999)}`;
    fs.mkdirSync(`./users/${uid}`, {recursive: true});
    fs.writeFileSync(`./users/${uid}/data.json`, JSON.stringify(data, null, 4));
}