const Discord = require('discord.js')
const config = require('../../../config.json')
const { log } = require('../../util/log')

module.exports = {
    name: 'help',
    desciption: "Displays all the bot's commands.",
    roles: null,
    async execute(client, message, args) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Twitchy Development - Command Help', config['C-LOGO'])
    .setColor(`${config.COLOR}`)
            .addField(":white_small_square: =channel (Channel Name)","Displays information about the given channel.")
            .addField(":white_small_square: =followers (Channel Name)","Displays the given channel's follower count and most recent followers.")
            .addField(":white_small_square: =topclip (Channel Name)","Displays information about the most popular clip for a given channel.")
            .addField(":white_small_square: =stream (Channel Name)","Displays information about a stream that is live.")
            .addField(":white_small_square: =setprefix","Change the prefix that the bot will respond to for your server.")
            .addField(":white_small_square: =support","Gives you an invite to the support server.")
            .addField(":white_small_square: =invite","Gives you a link to invite the bot to your own server.")
            .addField(":white_small_square: =ping","Displays the bot's current response time.")
            .addField(":white_small_square: =help",`Displays this help menu.\n\n[Support Server](${config['SUPPORT-SERVER']}) | [Invite Me!](${config['INVITE-LINK']})`)
    message.channel.send(embed)
    log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
    }
}