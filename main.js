const Discord = require("discord.js")
const { Client, GatewayIntentBits, ActivityType } = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const loadDatabase = require("./Loaders/loadDatabase")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.color = "#ffffff";
bot.function = {
    createId: require("./Fonctions/createId"),
    generateCaptcha: require("./Fonctions/generateCaptcha"),
    searchSpam: require("./Fonctions/searchSpam")
}

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)


bot.on("messageCreate", async message => {

    if(message.content === "/ping") return bot.commands.get("ping").run(bot, message)
}),

    bot.on('ready' , () => {

        console.log(`${bot.user.tag} Connecting to Discord API...`);
    
    bot.user.setPresence(
            {
            activities : [{ name: `Elysia Lounge | Issue? /support`, type: ActivityType.Playing}],
        }
      );

    console.log('SetPresence now active!')
    }
)

