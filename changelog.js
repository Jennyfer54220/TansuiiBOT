const Discord = require("discord.js")

module.exports = {

    name: "changelog",
    description: "Affiche le dernier patchnote de Elysia",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    category: "Annonces",
    dm: true,
    
    async run(bot, message, args) {
 
        let Embed3 = new Discord.EmbedBuilder()
       		 .setColor(`Red`)
       		 .setTitle("ERROR")
       		 .setDescription(`> **You don't have required permission to use this command**`)
       		 .setTimestamp()
       		 .setFooter({text: bot.user.username , iconURL: bot.user.displayAvatarURL({dynamic: true})})
		if(!message.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) return message.reply({embeds: [Embed3], ephemeral: true})
        
        return;
}
}