const Discord = require("discord.js")

module.exports = {
    name: "setantiraid",
    description: "Configure antiraid system",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Administration",
    dm: false,
    options: [
        {
            type: "string",
            name: "status",
            description: "Antiraid status (On/Off)",
            required: true,
            autocomplete: true
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

            db.query(`UPDATE server SET antiraid = 'false' WHERE guild = '${message.guild.id}'`)
              const btn2 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("ArDis")
        	.setLabel("Antiraid has been disabled!")
        	.setStyle(Discord.ButtonStyle.Danger)
        	.setDisabled(true))
            await message.reply({components: [btn2], ephemeral: true})

        } else {

            db.query(`UPDATE server SET antiraid = 'true' WHERE guild = '${message.guild.id}'`)
              const btn3 = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
        	.setCustomId("ArEnb")
        	.setLabel("Antiraid has been enabled!")
        	.setStyle(Discord.ButtonStyle.Success)
        	.setDisabled(true))
            await message.reply({components: [btn3], ephemeral: true})
    }
  }
}
