const config = require('../../../config.json')
const mongoose = require('mongoose')
const Guild = require('../../models/guild.js')
const { log } = require('../../util/log')

module.exports = {
    name: 'prefix',
    desciption: "Set's custom prefix.",
    roles: null,
    async execute(client, message, args) {
    if (!message.member.hasPermission('MANAGE_GUILD' || 'ADMINISTRATOR')) {
        message.reply('You must have `MANAGE_GUILD` or `ADMINISTRATOR` permission to execute this command.')
        return 
    }
    log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
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

            return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
        }
    })

    if (args.length < 1) {
        return message.channel.send('You must specify a prefix.')
    }

    await settings.updateOne({
            prefix: args[0]
        });

    return message.channel.send(`Your server prefix has been updated to \`${args[0]}\``);

    }
}