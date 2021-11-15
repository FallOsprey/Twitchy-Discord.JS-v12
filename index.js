const fs = require('fs')
const Discord = require('discord.js')
const config = require('./config.json')
const mongoose = require('./src/util/mongoose.js')
const Guild = require('./src/models/guild.js');
mongoose.init();

const { Client, Intents } = require('discord.js');


const { log } = require('./src/util/log')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Discord.Collection()

client.on('guildCreate', guild => { 
    log('CLIENT', `Added to ${guild.name} with ${guild.memberCount} members.`)
    client.channels.cache.get('876526720797265941').send(`:small_blue_diamond: Added to ${guild.name} with ${guild.memberCount} members.`)
    guild = new Guild({
        // _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: config.PREFIX
    });

    guild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    console.log('I have joined a new server!');
})

client.on('guildDelete', guild => { 
    log('CLIENT', `Removed from ${guild.name} with  ${guild.memberCount} members.`)
    client.channels.cache.get('876526720797265941').send(`:small_orange_diamond: Removed from ${guild.name} with ${guild.memberCount} members.`)
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log('I have been removed from a server!');
    });
})

function loadCommandsAndEvents() {

    // Reading command filez
    const commandFolders = fs.readdirSync('./src/commands').filter(f => !f.includes('.'))
    for (const folder in commandFolders) {
        const commandFiles = fs.readdirSync(`./src/commands/${commandFolders[folder]}`).filter(file => file.endsWith('.js'))
        for (const commandFile in commandFiles) {
            const command = require(`./src/commands/${commandFolders[folder]}/${commandFiles[commandFile]}`)
            client.commands.set(command.name, command)
            log('CLIENT', `Loaded ${commandFolders[folder]} command ${command.name}.`)
        }
    }

    // Reading event files
    const eventFolder = fs.readdirSync('./src/events').filter(f => f.endsWith('.js'))
    for (const eventFile in eventFolder) {
        const event = require(`./src/events/${eventFolder[eventFile]}`)
        const eventName = eventFolder[eventFile].split('.')[0]

        if (event.once) {
            client.once(eventName, (...args) => event.execute(...args, client))
        } else {
            client.on(eventName, (...args) => event.execute(...args, client))
        }

        log('CLIENT', `Loaded discord event ${eventName}.`)
    }
}
// client.mongoose.init();
client.login(config.BETATOKEN).then(() => loadCommandsAndEvents())

// Exporting client incase we'd need to use it in a utils file.
module.exports = { client }