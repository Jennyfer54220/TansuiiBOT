const Discord = require("discord.js")

module.exports = {
    name: "ticketinfo",
    description: "Show information about ticket system",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Moderation",
    dm: false,
    
    async run(bot, message, args) {

        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("erreur")
        .setLabel("Error | You don't have required permissions")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(true)
        .setEmoji("<:ElyRealmAlert:1060385809003450448>"))
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.BanMembers))
        return message.reply({components: [btn], ephemeral: true})

        let embed = new Discord.EmbedBuilder()
        .setColor("Blurple")
        .setTitle("Ticket system information")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("You can view all information about ticket system below")
        .addFields(
        {name: "Module Version", value: "Version 1.0.2", inline: true},
        {name: "Last Update", value: "01/23/2023 | 6:03pm UTC+1", inline: true},
        {name: "Module Author", value: "Jennyfer Simon", inline: true},
        {name: "Module Description", value: "Adds an embed to allow people to create a ticket inside the chosen category"}
        )
        .setTimestamp()
        .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
    
        await message.reply({embeds: [embed]})
    }
}