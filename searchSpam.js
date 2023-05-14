const User = new Map()
const Discord = require("discord.js")

module.exports = async message => {
    
    if(message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) return;
       
    if(User.get(message.author.id)) {
        
        const data = User.get(message.author.id)
        let difference = message.createdTimestamp - data.lastMessage.createdTimestamp;
        let count = data.msgCount;
        
        if(difference > 3000) {
            
            clearTimeout(data.timer)
            data.msgCount += 1;
            data.lastMessage = message;
            
            data.timer = setTimeout(() => {
                User.delete(message.author.id)
            }, 5000)
            
            User.set(message.author.id, data)
        } else {
            
            count++;
            
            if(count > 5) {
                
                 let Embed = new Discord.EmbedBuilder()
                .setColor(`Red`)
                .setTitle(`Auto-mod`)
                .setDescription(`${message.author} You have been timed-out for 3 minutes because you have brak server rules`)
                
                await message.channel.send({embeds: [Embed]})
                await message.member.timeout(180000, "spam")
                const messages = [...(await message.channel.messages.fetch({before: message.id})).filter(m => m.author.id === message.author.id).values()].slice(0, 10)
                await message.channel.bulkDelete(messages)
                
            } else {
                
                data.msgCount = count;
                User.set(message.author.id, data)
            }
        }
    } else {
        
        let FN = setTimeout(() => {
            User.delete(message.author.id)
        }, 5000)
        
        User.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: FN
        })
    }
}