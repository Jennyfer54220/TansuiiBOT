const Discord = require("discord.js")

module.exports = {

    name: "support",
    description: "Join Elysia server support",
    permission: "Aucune",
    category: "Elysia Support",
    dm: true,
    
 async run (bot, message, args) {
        
        let Embed = new Discord.EmbedBuilder()
        
        .setColor(`Purple`)
        .setTitle(`Join support server?`)
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .setDescription("Click button to join support server")
        .setTimestamp()
        .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        
        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        
        .setLabel("Join support server")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL("https://discord.gg/vJz4kmRGuP")
        .setEmoji("<:ElyRealmAlert:1060385809003450448>"))
        
        return message.reply({embeds: [Embed], components: [btn], ephemeral: true})
    }
}