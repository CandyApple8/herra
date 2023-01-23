const { SlashCommandBuilder, PermissionsBitField } = require("discord.js")

exports.main = (msg, args) =>
{

}

exports.mainS = (inter, ops) => 
{
    inter.channel.bulkDelete(ops[0]["value"]).catch(err =>
    {
        if (err)
        {
            return inter.reply({content: "`bulkDelete` error\n`" + err.toString()+"`", ephemeral: true});
        }
    }).then(ok =>{
        return inter.reply({content: "`bulkDelete` complete", ephemeral: true});
    });
}

exports.admin = true;

exports.slash = new SlashCommandBuilder()
    .setName("cls")
    .setDescription("Bulk delete messages")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addIntegerOption(op =>
        op.setMaxValue(100)
            .setMinValue(1)
            .setRequired(true)
            .setName("value")
            .setDescription("Amount of messages to delete")
    )