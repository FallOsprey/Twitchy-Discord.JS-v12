const config = require('../../config.json')
const mongoose = require('mongoose')
const Guild = require('../models/guild.js')
const prefix1 = config.PREFIX
const { log } = require('../util/log')


module.exports = {
    async execute(message, client) {

        if (message.channel.type === 'DM'){ 
            return console.log(`Test`) 
        }

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: config.PREFIX
                })
    
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
    
                return message.channel.send('This server was not in our database! We have added it and you can do commands now.').then(m => m.delete({timeout: 10000}));
            }
        })

        const prefix = settings.prefix
        
        if (message.content.startsWith('=')) {
            log('PREFIX', `${message.author.tag}: ${message}`)
        }


        if (!message.content.startsWith(prefix) || message.author.bot) { return; }
        log('EXEC', `${message.author.tag}: ${message}`)
        // Turning string into argss
        const args = message.content.slice(prefix.length).trim().split(' ');
        const commandName = args.shift().toLowerCase();
    
        // Executing the command
        if (!client.commands.has(commandName)) { return; }

        const command = client.commands.get(commandName)

        if (command.roles) {
            if (message.member.roles.cache.some(role => command.roles.includes(role.id))) {
                command.execute(client, message, args)
            } else {
                message.reply('You don\'t have permission to execute that command!')
            }
        } else {
            command.execute(client, message, args)
        }
    }
}