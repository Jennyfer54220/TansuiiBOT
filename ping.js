const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "Show discord latence",
    permission: "Aucune",
    category: "Utilities",
    dm: true,

   async run(bot, message, args) {
		
   let Embed = new Discord.EmbedBuilder()
   .setColor(bot.color)
   .setTitle("Elysia Ping")
   .setDescription(`Current Elysia ping: \`${bot.ws.ping}ms\``)
   .setTimestamp()
   .setFooter({text: "Elysia Ping", iconURL: bot.user.displayAvatarURL({dynamic: true})})
   
   await message.reply({embeds: [Embed]})
  }
}