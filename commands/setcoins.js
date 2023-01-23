const coins = require("../coinSystem/handler");

exports.main = (msg, args) =>
{
    if (args.length < 3) return msg.reply("Missing args, required: `userID (ULONG 'c#' | int 'def' | string 'js')` `value (int)`, `operator (+ | - | set)`");
    if (isNaN(args[1])) return msg.reply("Value is NaN");
    var validOperator = ["+", "-", "set"];
    if (!validOperator.includes(args[2])) return msg.reply(`Invalid operator \`${args[2]}\``);
    var res = null;
    try {
        res = coins.changeVal(args[0], args[1], args[2]);
    } catch (err) 
    {
        if (err)
        {
            res = "error";
            return msg.reply("ERROR :(\n" + err);
        }
    }
    if (res == "error") return msg.reply(`${res}`)
    msg.reply("Done"+`\n${res}`);
}

exports.owner = true;