const Discord = require("discord.js")

module.exports = {

    name: "about",
    description: "View all informations about Elysia",
    permission: "Aucune",
    category: "Utilities",
    dm: true,

    async run(bot, interaction, args) {
    
        let Embed = new Discord.EmbedBuilder()
        
        .setColor(`Blurple`)
        .setTitle(`Information`)
        .setDescription("**About Elysia**")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .addFields(
        { name: "Version", value: "**`v1.3 Canary`**", inline: true},
        { name: "Build Version", value: "**`[v1.3 - Build 3.0.6] Elysia.Canary`**", inline: true},
        { name: "Elysia Developer", value: "**`Jennyfer#7914`**", inline: true},
        { name: "Database", value: "**`Online / Enabled & Secured`**", inline: true}
        )   
        .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        .setTimestamp()
        
        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setLabel("Support server")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL("https://discord.gg/vJz4kmRGuP")
        .setDisabled(false))
        
         const btn2 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setLabel("Add me!")
        .setStyle(Discord.ButtonStyle.Link)
        .setURL("https://discord.com/api/oauth2/authorize?client_id=749669312884899961&permissions=1393985711190&scope=bot")
        .setDisabled(false))
         
        const btn3 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("elydate")
        .setLabel("Last update: May, 8th 2023")
        .setStyle(Discord.ButtonStyle.Success)
        .setDisabled(true))
        
        await interaction.reply({embeds: [Embed], components: [btn, btn2, btn3]})
    }
}