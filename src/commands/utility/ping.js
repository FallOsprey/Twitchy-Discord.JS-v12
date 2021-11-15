const config = require('../../../config.json')
const Discord = require('discord.js')
const { log } = require('../../util/log')
const { disclog } = require('../../../index')
module.exports = {
    name: 'ping',
    desciption: 'Gives bot\'s response time',
    roles: null,
    async execute(client, message, args) {
    const date = new Date();
    const ping = date.getTime() - message.createdAt.getTime()
    message.reply("Pong! :ping_pong:")
    // message.reply(`Pong! \`${Math.abs(ping)}ms\``)
    log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
    }
}