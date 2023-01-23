const { SlashCommandBuilder, PermissionsBitField } = require("discord.js")

exports.main = (msg, args) =>
{
    //console.log()
}

exports.mainS = (inter, ops) =>
{
    
}

//make sure to add .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator) in slash export
exports.admin = true;

exports.slash = new SlashCommandBuilder()
    .setName("rall")
    .setDescription("Gives a role to all users")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addRoleOption(op =>
        op.setName("role")
            .setDescription("Role to add")
            .setRequired(true)
    )
    .addBooleanOption(op =>
        op.setName("action")
            .setDescription("true = add, false = remove")
            .setRequired(true)
    )
    .addBooleanOption(op =>
        op.setName("ex_admin")
            .setDescription("Exclude members with admin perm")
    )
    .addBooleanOption(op =>
        op.setName("ex_role")
            .setDescription("Exclude members with given role")
    )
    .addBooleanOption(op =>
        op.setName("inc_bots")
            .setDescription("Include bots")
    )