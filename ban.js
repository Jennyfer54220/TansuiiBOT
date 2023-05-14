const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: "Ban an user",
    permission: Discord.PermissionFlagsBits.BanMembers,
    category: "Moderation",
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "Ban an user",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "reason",
            description: "Ban reason",
            required: true,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {

        try {
        
          const btn8 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
          .setCustomId("erreur")
          .setLabel("Error | You don't have required permissions")
          .setStyle(Discord.ButtonStyle.Danger)
          .setDisabled(true)
          .setEmoji("<:ElyRealmAlert:1060385809003450448>319021126>"))
        if(!message.member.permissions.has(Discord.PermissionFlagsBits.BanMembers))
        return message.reply({components: [btn8], ephemeral: true})
            
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("nmtb")                                                     
       		.setLabel("Error: No members to ban")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            
            if(!user) return message.reply({components: [btn], ephemeral: true})
            let member = message.guild.members.cache.get(user.id)

            let reason = args.get("reason").value;
            if(!reason) reason = "No provided reason.";
			
            const btn2 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
       			.setCustomId("dtby")                                                     
        		.setLabel("Don't try to ban yourself!")
       		 	.setStyle(Discord.ButtonStyle.Danger)
        		.setDisabled(true))
            
            if(message.user.id === user.id) return message.reply({components: [btn2], ephemeral: true})
            const btn3 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("npbso")                                                     
        	.setLabel("It's not possible to ban the server owner")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            if((await message.guild.fetchOwner()).id === user.id) return message.reply({ components: [btn3], ephemeral: true})
            const btn4 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
       		.setCustomId("cbtu")                                                     
        	.setLabel("You can't use this command ! | ERROR: You are not Elysia owner")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            if(member && !member.bannable) return message.reply({ components: [btn4], ephemeral: true})
            const btn5 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("ycbtu")                                                     
        	.setLabel("You can't ban this user")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({components: [btn5], ephemeral: true})
            const btn6 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("tuiab")                                                     
        	.setLabel("This user is already banned!")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply({components: [btn6], ephemeral: true})
			
            let Embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("You have been banned from a server.")
            .setDescription(`Hello ${user}, you have been banned from a server you are a member, please check all details bellow to know what is the server you have been banned and the reason`)
            .addFields(
                {name: "Server Name", value: `${message.guild.name}`},
                {name: "Ban reason", value: `Reason: ${reason}`},
                {name: "Contest ban?", value: `If you think it was an error, please contact the moderation team`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
            try {await user.send({embeds: [Embed]})} catch(err) {}

            let Embed2 = new Discord.EmbedBuilder()
            .setColor(`Green`)
            .setTitle('You have successfully banned an user')
            .setDescription(`Hiiiiiii~ Looky looky the full details about ban information below!`)
            .addFields(
                {name: "User banned", value: `${user}`},
                {name: "Ban Reason", value: `${reason}`},
                {name: "User banned by", value: `${message.user}`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
            await message.reply({embeds: [Embed2]})

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {
            
            const btn7 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("nouser")                                                     
       		.setLabel("Error: No User!")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            return message.reply({components: [btn7], ephemeral: true})
        }
    }
}