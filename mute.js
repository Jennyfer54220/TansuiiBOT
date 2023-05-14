const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "mute",
    description: "Time-out an user",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Moderation",
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "Time-out user",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "time",
            description: "time-out duration (exemple 1d for 24h - Max: 28d)",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "Time-out reason",
            required: false,
            autocomplete: false
        }
    ],

    async run(bot, message, args) {

		 let Embed = new Discord.EmbedBuilder()
       		 .setColor(`Red`)
       		 .setTitle("ERROR")
       		 .setDescription(`> **You don't have required permission to use this command**`)
       		 .setTimestamp()
       		 .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) return message.reply({embeds: [Embed], ephemeral: true})
        
        let user = args.getUser("member")
        let Embed2 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription(`> No user mentionned, please mention an user`)
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(!user) return message.reply({embeds: [Embed2], ephemeral: true})
        let member = message.guild.members.cache.get(user.id)
        let Embed3 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription(`> No user found, please check if this user is a member of this guild`)
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(!member) return message.reply({embeds: [Embed3], ephemeral: true})
            
        let Embed4 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("Wrong format used")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        let time = args.getString("time")
        if(!time) return message.reply({embeds: [Embed4], ephemeral: true})
        let Embed5 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("Wrong format used")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(isNaN(ms(time))) return message.reply({embeds: [Embed5], ephemeral: true})
        let Embed6 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("The mute duration cannot exceed 28days [28d max, ex: 1d for one day]")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(ms(time) > 2419200000) return message.reply({embeds: [Embed6], ephemeral: true})

        let reason = args.getString("raison")
        if(!reason) reason = "No reason.";

        let Embed7 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("You can't timeout yourself")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(message.user.id === user.id) return message.reply({embeds: [Embed7], ephemeral: true})
        let Embed8 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("You can't timeout the server owner.")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if((await message.guild.fetchOwner()).id === user.id) return message.reply({embeds: [Embed8], ephemeral: true})
        let Embed9 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("I can't timeout this user. please check my permissions or contact the bot team, i need to be superior to the user.")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(!member.moderatable) return message.reply({embeds: [Embed9], ephemeral: true})
        let Embed10 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("I can't timeout this user, because this user has a highest role to me.")
            .setTimestamp()
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [Embed10], ephemeral: true})
        let Embed11 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("ERROR")
            .setDescription("This user are already timed out. Please try again.")
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        if(member.isCommunicationDisabled()) return message.reply({embeds: [Embed11], ephemeral: true})

        let Embed12 = new Discord.EmbedBuilder()
            .setColor("Red")
            .setTitle("You have been timed out.")
            .setDescription(`Hello ${user}, you have been timed out from a server you are a member, please check all details bellow to know what is the server you have been timed-out and the reason`)
            .addFields(
                {name: "Server Name", value: `${message.guild.name}`},
                {name: "Timeout duration", value: `You have been timed out for ${time}`},
                {name: "Timeout reason", value: `Reason: ${reason}`},
                {name: "Contest timeout?", value: `If you think it was an error, please contact the moderation team`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        try {await user.send({embeds: [Embed12]})} catch(err) {}

        let Embed13 = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Success!")
            .setDescription("Hiiiiiii~ Looky looky the full details about time-out information below!")
            .addFields(
                {name: "User timed-out", value: `${user}`},
                {name: "Timeout duration", value: `This user has been timed-out for ${time}`},
                {name: "Timeout reason", value: `Reason: ${reason}`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        await message.reply({embeds: [Embed13]})

        await member.timeout(ms(time), reason)
    }
}