const fs = require("fs");
const cs = require("../../coinSystem/handler");

function randomizeString(str)
{
    // split the string into an array of characters
    var charArray = str.split('');

    // shuffle the array using the Fisher-Yates shuffle algorithm
    for (var i = charArray.length - 1; i > 0; i--)
    {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = charArray[i];
        charArray[i] = charArray[j];
        charArray[j] = temp;
    }

    // join the array back into a string and return it
    return charArray.join('');
}

const arr = fs.readFileSync(`${ __dirname }/wordlist.txt`, "utf-8").split("\n");

function get20PercentCharacters(word)
{
    const length = word.length;
    const numCharacters = Math.round(length * 0.2);
    return word.substring(0, numCharacters);
}

function getLast20PercentCharacters(word)
{
    const length = word.length;
    const numCharacters = Math.round(length * 0.2);
    return word.substring(length - numCharacters, length);
}

//https://api.dictionaryapi.dev/api/v2/entries/en/rumble

exports.play = (inter, ops) =>
{
    cs.changeVal(inter.member.id, 100, "-");

    const index = Math.floor(Math.random() * arr.length);
    const prize = Math.round(Math.random() * (arr[index].length * 100))
    
    inter.reply("Guess the word bellow, prize is `" + prize.toString() + "` coins!\nYou have 30 seconds to guess it!\n`" + randomizeString(arr[index]) + "`\nWord starts with `" + get20PercentCharacters(arr[index]) + "` and ends with `" + getLast20PercentCharacters(arr[index]) + "`");
    
    const collector = inter.channel.createMessageCollector({ time: 30000 })

    let succ = false;

    collector.on("collect", (msg) => 
    {
        if (msg.member.id !== inter.member.id) return;
        if (succ == true) return;
        if (msg.content == arr[index]) 
        {
            succ = true;
            cs.changeVal(msg.member.id, parseInt(prize), "+");
            return msg.reply(`You got it!\n\`${prize}\` coins added to your balance`)
        }
        return msg.react("❌");
    });

    collector.on("end", () =>
    {
        if (succ == false) inter.channel.send(`<@${ inter.member.id }> Out of time :( you lost \`100\` coins\nThe word was: \`${ arr[index] }\``);
    });

}