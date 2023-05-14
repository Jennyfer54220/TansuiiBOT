const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: "unmute",
    description: "stop time-out a member",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Moderation",
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "User to stop time-out",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "reason",
            description: "stop time-out reason",
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
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.ModeratekMembers)) return message.reply({embeds: [Embed3], ephemeral: true})
        
        let user = args.getUser("member");
        if(!user) return message.reply("No member")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("No member!")

        let reason = args.getString("reason")
        if(!reason) reason = "No reason";

        if(!member.moderatable) return message.reply("You can't stop the member time-out")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can't stop the member time-out")
        if(!member.isCommunicationDisabled()) return message.reply("This user is not timed-out")
        let Embed4 = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Time-out revoked")
            .setDescription("Your timeout has been removed, please check all details bellow!")
            .addFields(
                {name: "User timed-out removed", value: `${user}`},
                {name: "Timeout removed reason", value: `Reason: ${reason}`},
                {name: "Timeout removed by", value: `${message.user}`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        try {await user.send({embeds: [Embed4]})} catch (err) {}
        
        let Embed6 = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle("Time-out revoked")
            .setDescription(`Hiiiii~ ${message.user}\nPlease check all details bellow`)
            .addFields(
                {name: "User timed-out removed", value: `${user}`},
                {name: "Timeout removed reason", value: `Reason: ${reason}`},
                {name: "Timeout removed by", value: `${message.user}`}
            )
            .setTimestamp()
            .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
        await message.reply({embeds: [Embed6]})
        
        await member.timeout(null, reason)
    }
}