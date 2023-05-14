const Discord = require("discord.js")
      
module.exports = {
    name: "deletechannel",
    description: `Delete channel -> You need use this command inside channel you want delete`,
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Administration",
    dm: false,
    options: [],
    
    async run(bot, message, args, db) {
 
        let Embed3 = new Discord.EmbedBuilder()
       		 .setColor(`Red`)
       		 .setTitle("ERROR")
       		 .setDescription(`> **You don't have required permission to use this command**`)
       		 .setTimestamp()
       		 .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return message.reply({embeds: [Embed3], ephemeral: true})
        
        let Embed = new Discord.EmbedBuilder()
        .setColor(`Red`)
        .setTitle("ALLERT!")
        .setDescription("Do you realy want delete this channel?")
        .setTimestamp()
        .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})
        
        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("delchan")
        .setLabel("Delete channel")
        .setStyle(Discord.ButtonStyle.Danger)
        .setEmoji("🗑️"))
        
        await message.reply({embeds: [Embed], components: [btn], ephemeral: true})
    } 
  }