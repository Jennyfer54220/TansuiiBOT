const Discord = require("discord.js")

module.exports = {
    
    name: "warnlist",
    description: "Show member warning",
    permission: Discord.PermissionFlagsBits.KickMembers,
    category: "Moderation",
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "Show member warnlist",
            required: true,
            autocomplete: false
        }
    ],
    
    async run(bot, message, args, db) {
        
        let Embed = new Discord.EmbedBuilder()
       		 .setColor(`Red`)
       		 .setTitle("ERROR")
       		 .setDescription(`> **You don't have required permission to use this command**`)
       		 .setTimestamp()
       		 .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) return message.reply({embeds: [Embed], ephemeral: true})
        
        let user = args.getUser("member")
        if(!user) return message.reply("No member")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("No member")
        
        db.query(`SELECT * FROM warns WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {
            
            let Embed2 = new Discord.EmbedBuilder()
            .setColor(`Green`)
            .setTitle(`${user.tag} warn list`)
            .setDescription("This user doesn't have any warns")
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({text: "No warns found"})
            
            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("NoWarns")
        	.setLabel("No warns found!")
        	.setStyle(Discord.ButtonStyle.Success)
        	.setEmoji("<:ElyHand:1060385620297535568>")
            .setDisabled(true))
            if(req.length < 1) return message.reply({embeds: [Embed2], components: [btn]})
            await req.sort((a, b) => parseInt(b.date) - parseInt(a.date))
            
            let Embed3 = new Discord.EmbedBuilder()
            .setColor(`Red`)
            .setTitle(`${user.tag} warn list`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setFooter({text: "Warns"})
            
            for(let i = 0; i < req.length; i++) {
                
                Embed3.addFields({name: `Warn n°${i+1}`, value: `**Author**: ${(await bot.users.fetch(req[i].author)).tag}\n**ID**: ${req[i].warn}\n**Reason**: ${req[i].reason}\n**Date**: <t:${Math.floor(parseInt(req[i].date) / 1000)}:F>`})
            }

	      await message.reply({embeds: [Embed3]})
        })
    }
}