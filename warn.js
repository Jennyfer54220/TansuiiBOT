const Discord = require("discord.js")

module.exports = {

	name: "warn",
    description: "Warn an user",
    permission: Discord.PermissionFlagsBits.KickMembers,
    category: "Moderation",
    dm: false,
    options: [
    	{
        type: "user",
        name: "member",
        description: "set an user warn",
        required: true,
        autocomplete: false
        }, {
        type: "string",
        name: "reason",
        description: "Warn reason",
        required: false,
        autocomplete: false
        }
    ],
    
    async run(bot, message, args, db) {
        
        let Embed0 = new Discord.EmbedBuilder()
       		 .setColor(`Red`)
       		 .setTitle("ERROR")
       		 .setDescription(`> **You don't have required permission to use this command**`)
       		 .setTimestamp()
       		 .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) return message.reply({embeds: [Embed0], ephemeral: true})
    
    	let user = args.getUser("member")
        let NoUser = new Discord.EmbedBuilder()
        .setTitle("Error")
        .setDescription("No member found")
        .setTimestamp()
        if(!user) return message.reply({embeds: [NoUser]})
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("No member")
        
        let reason = args.getString("reason")
        if(!reason) reason = "No reason";
        
        let Embed = new Discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Error")
        .setDescription("You can't warn yourself")
        .setTimestamp()
        if(message.user.id === user.id) return message.reply("You can't warn yourself")
        let Embed2 = new Discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Missing Permissions")
        .setDescription("You can't warn server owner")
        .setTimestamp()
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("> You can't warn server owner")
        let Embed3 = new Discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("Missing Permission")
        .setDescription("You can't warn this user because he has a higher role than your")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({embeds: [Embed3]})

        let Embed4 = new Discord.EmbedBuilder()
        .setColor("Red")
        .setTitle("You recieved a warn")
        .setDescription("Hiii, you recieved a warn, please check all details bellow")
        .addFields(
        {name: "Server name", value: `${message.guild.name}`},
        {name: "Warn reason", value: `${reason}`},
        {name: "Any error?", value: "If you think it was an error, please contact server moderation team !"})
        .setTimestamp()
		try { await user.send({embeds: [Embed4]}) } catch (err) {}
        
        let Embed5 = new Discord.EmbedBuilder()
        .setColor("Green")
        .setTitle("You have set a warn to an user")
        .setDescription("Hiii you have set a warn to an user, check all details bellow")
        .addFields(
        {name: "User name/ID", value: `${user} - ${user.id}`},
        {name: "Warn reason", value: `${reason}`})
        .setTimestamp()
        await message.reply({embeds: [Embed5]})
        
        let ID = await bot.function.createId("WARN")
        
        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}