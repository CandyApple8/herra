const { SlashCommandBuilder } = require("discord.js");

exports.mainS = (inter, ops) =>
{
    const apiKey = "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";
    const prompt = ops[0]["value"];
    const model = "text-davinci-002";
    const temperature = 0.5;

    const data = {
        prompt: prompt,
        temperature: temperature,
        max_tokens: 100
    };

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    //inter.channel.send("Generating response...");
    
    fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson =>
        {
            console.log(responseJson);
            inter.reply({content: responseJson.choices[0].text});
        })
        .catch(error =>
        {
            inter.reply(error);
        });
}

exports.slash = new SlashCommandBuilder()
.setName("ai")
.setDescription("Ask me something")
.addStringOption(op =>
    op.setName("question")
    .setDescription("What do you wanna ask?")
    .setRequired(true)
);