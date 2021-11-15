const Discord = require('discord.js')
const config = require('../../../config.json')
const { log } = require('../../util/log')

module.exports = {
    name: 'invite',
    desciption: 'Provides link to add the bot to a server.',
    roles: null,
    async execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Twitchy Development - Bot Invite Link', config['C-LOGO'], `${config['INVITE-LINK']}`)
    .setDescription(`Hello! Please click the title if you would like to add Twitchy to your server. Thank you for using Twitchy!! **;)**\n\n[Support Server](${config['SUPPORT-SERVER']}) | [Invite Me!](${config['INVITE-LINK']})`)
    message.channel.send(embed)
    log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
    }
}