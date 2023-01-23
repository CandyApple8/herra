exports.main = (msg, args, client) =>
{
    var res = "";
    try {
        res = eval(args.join(" "));
    } catch (err)
    {
        res = err.toString()
    }

    msg.channel.send("```js\n" + res + "\n```");
}

exports.sys = true;