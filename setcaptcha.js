const Discord = require("discord.js")

module.exports = {
    name: "setcaptcha",
    description: "Configure the captcha",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Administration",
    dm: false,
    options: [
        {
            type: "string",
            name: "status",
            description: "Status of captcha (On/Off)",
            required: true,
            autocomplete: true
        }, {
            type: "channel",
            name: "channel",
            description: "Captcha channel (insert if on)",
            required: false,
            autocomplete: false
        }
    ],
    async run(bot, message, args, db) {

        let Embed3 = new Discord.EmbedBuilder()
       		 .setColor(`Red`)
       		 .setTitle("ERROR")
       		 .setDescription(`> **You don't have required permission to use this command**`)
       		 .setTimestamp()
       		 .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return message.reply({embeds: [Embed3], ephemeral: true})
        
        let etat = args.getString("status")
         const btn = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("ind")
        .setLabel("Indicates on or off")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(true))
        if(etat !== "on" && etat !== "off") return message.reply({components: [btn], ephemeral: true})

        if(etat === "off") {

            db.query(`UPDATE server SET captcha = 'false' WHERE guild = '${message.guild.id}'`)
             const btn2 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
       		 .setCustomId("capdis")
       		 .setLabel("The Captcha verification has been disabled!")
       		 .setStyle(Discord.ButtonStyle.Danger)
        	 .setDisabled(true))
            await message.reply({components: [btn2], ephemeral: true})

        } else {
            
        let channel = args.getChannel("channel")
         const btn3 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("NoChan")
        .setLabel("No channel specified, please specify one")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(true))
        if(!channel) return message.reply({components: [btn3], ephemeral: true})
        channel = message.guild.channels.cache.get(channel.id)
         const btn4 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        .setCustomId("NoFound")
        .setLabel("Channel not found")
        .setStyle(Discord.ButtonStyle.Danger)
        .setDisabled(true))
        if(!channel) return message.reply({components: [btn4], ephemeral: true})

            db.query(`UPDATE server SET captcha = '${channel.id}' WHERE guild = '${message.guild.id}'`)
             const btn5 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("CapEn")
        	.setLabel(`The captcha verification has been enabled inside #${channel.name} channel!`)
        	.setStyle(Discord.ButtonStyle.Success)
        	.setDisabled(true))
            await message.reply({components: [btn5], ephemeral: true})
    }
  }
}
