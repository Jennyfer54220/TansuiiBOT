const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "Kick an user",
    permission: Discord.PermissionFlagsBits.KickMembers,
    category: "Moderation",
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "User to kick",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "reason",
            description: "Kick reason",
            required: false,
            autocomplete: false
        }
    ],
    async run(bot, message, args) {
        
        let Embed3 = new Discord.EmbedBuilder()
        .setColor(`Red`)
        .setTitle("ERROR")
        .setDescription(`> **You don't have required permission to use this command**`)
        .setTimestamp()
        .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) return message.reply({embeds: [Embed3], ephemeral: true})
        
        let user = args.getUser("member")
        const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("nmtk")                                                     
       		.setLabel("Error: No user to kick")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
        if(!user) return message.reply({components: [btn], ephemeral: true})
        let member = message.guild.members.cache.get(user.id)
        const btn2 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("nmtkk")                                                     
       		.setLabel("Error: No user to kick")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
        if(!user) return message.reply({components: [btn2], ephemeral: true})

        let reason = args.getString("reason")
        if(!reason) reason = "No reason.";

        const btn3 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("ycky")                                                     
       		.setLabel("Error: You can't kick yourself")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
        if(message.user.id === user.id) return message.reply({components: [btn3], ephemeral: true})
        const btn4 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("yckso")                                                     
       		.setLabel("Error: You can't kick the server owner")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
        if((await message.guild.fetchOwner()).id === user.id) return message.reply({components: [btn4], ephemeral: true})
        const btn5 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("icktu")                                                     
       		.setLabel("Error: I can't kick this user")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
        if(member && !member.kickable) return message.reply({components: [btn5], ephemeral: true})
        const btn6 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("ycktu")                                                     
       		.setLabel("Error: You can't kick this user")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({components: [btn6], ephemeral: true})
        
        let Embed = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("You have been kicked from a server.")
            .setDescription(`Hello ${user}, you have been kicked from a server you are a member, please check all details bellow to know what is the server you have been kicked and the reason`)
            .addFields(
                {name: "Server Name", value: `${message.guild.name}`},
                {name: "Kick reason", value: `Reason: ${reason}`},
                {name: "Contest kick?", value: `Join the server again`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        try {await user.send({embeds: [Embed]})} catch(err) {}

        let Embed2 = new Discord.EmbedBuilder()
        .setColor("Green")
            .setTitle("Success!")
            .setDescription("Hiiiiiii~ Looky looky the full details about kick information below!")
            .addFields(
                {name: "User kicked", value: `${user}`},
                {name: "Kick reason", value: `Reason: ${reason}`},
                {name: "Kicked by", value: `${message.user}`},
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        await message.reply({embeds: [Embed2]})

        await member.kick(reason)
    }
}