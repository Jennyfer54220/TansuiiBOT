const Discord = require("discord.js")

module.exports = {

    name: "test",
    description: "test.elysia.build.canary",
    permission: "Aucune",
    category: "Bot owner panel",
    dm: true,

    async run(bot, message, interaction, args) {
    
        let verif = new Discord.EmbedBuilder()
        .setColor(`Red`)
        .setTitle("An error has occurred")
        .setDescription(`**Please check details bellow**`)
        .addFields(
        {name: "Error code", value: "Error 00xf00372"},
        {name: "Error description", value: "You are not an Elysia developper"})
        .setTimestamp()
        .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if (message.user.id !== '241352057339117578') return message.reply({embeds: [verif], ephemeral: false})
        
        let Embed = new Discord.EmbedBuilder()
        
        .setColor(`Blurple`)
        .setTitle(`Elysia Canary`)
        .setDescription("test.elysia.build.canary")
        .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
        .addFields(
        { name: "Available Build", value: "4", inline: false},
        { name: "Build 1", value: "**Build date:** <t:1678402800:D>\n**Build ID:** `b31cc024-98e6-4f6b-88ce-b86681b0def0`\n**Build name:** Music.build.canary\n**Build description:** Enable music inside Elysia\n**Build status:** `Disabled`", inline: false},
        { name: "Build 2", value: "**Build date:** <t:1683336170:D>\n**Build ID:** `b9b4efc9-fa92-44d2-a4a8-a99fac6ab035`\n**Build name:** BulkDelete.build.canary\n**Build description:** Enable Bulk Delete command feature inside Elysia\n**Build status:** `Disabled`", inline: false},
        { name: "Build 3", value: "**Build date:** <t:1683336170:D>\n**Build ID:** `1ae2e0df-44a1-4750-8b1b-a8f7ef7b0428`\n**Build name:** Ticket-English.build.canary\n**Build description:** Enable English ticket module inside Elysia\n**Build status:** `Enabled`", inline: false},
        { name: "Build 4", value: "**Build date:** <t:1683336170:D>\n**Build ID:** `fcb0f1da-a8b6-4c29-8bd9-30d0a16a5478`\n**Build name:** DeleteChannel.build.canary\n**Build description:** Enable Delete Channel command feature inside Elysia\n**Build status:** `Enabled`", inline: false},
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
        
        const btn4 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("elybuild")
        .setLabel("Access to Elysia Admin Panel")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(true))
        
        await message.reply({embeds: [Embed], components: [btn, btn2, btn3, btn4]})
    }
}