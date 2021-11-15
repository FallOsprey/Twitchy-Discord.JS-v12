const Discord = require('discord.js')
const config = require('../../../config.json')
const { log } = require('../../util/log')

module.exports = {
    name: 'support',
    desciption: 'Provides link to the support server.',
    roles: null,
    async execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Twitchy Development - Support Server', config['C-LOGO'], `${config['SUPPORT-SERVER']}`)
    .setDescription(`Hello! Please click the title to join the support server. A member of the Twitchy Community Support team will be waiting to assist you!\n\n[Support Server](${config['SUPPORT-SERVER']}) | [Invite Me!](${config['INVITE-LINK']})`)
    message.channel.send(embed)
    log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
    }
}