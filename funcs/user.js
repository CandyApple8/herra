const fs = require("fs");

exports.get = (id, key=null) => 
{
    const uPath = `${__dirname}/../users/${ id }/data.json`;
    
    if (!fs.existsSync(`${uPath}`)) return "nouser";

    const fullData = JSON.parse(fs.readFileSync(uPath, "utf-8"));

    return key == null ? fullData : fullData[key];
}

exports.write = (id, data) => 
{
    const path = `${__dirname}/../users/${id}/data.json`;
    if (!fs.existsSync(path)) return "nouser";

    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}