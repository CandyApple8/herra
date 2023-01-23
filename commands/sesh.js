const fs = require("fs");

const {sessionID, debug} = require("../events/clientReady");

exports.main = (msg) => {
    msg.channel.send(`Session ID: \`${sessionID}\`\nDebug: \`${debug}\``)
}