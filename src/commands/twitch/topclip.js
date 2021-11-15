const config = require('../../../config.json')
const Discord = require('discord.js')
var fetch = require('node-fetch');
const moment = require('moment')
const { log } = require('../../util/log')

module.exports = {
    name: 'topclip',
    desciption: 'Displays number of followers for a given channel.',
    roles: null,
    async execute(client, message, args) {
    if (args[0]) {
    const channelName = args[0] 
    
    const ClientID = (`${config.ClientID}`)
    const Auth = (`${config.AuthKey}`)

    fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, { // get user id
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
    })
    .then(resp1 => resp1.json())
    .then((resp1) => {
    if (resp1.data == ""){
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField(`Error 404`, `Sorry! I was unable to find the channel: \`${channelName}\`.`)
    message.channel.send(embed)
    } else {
    const channelID = resp1.data[0].id
    fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${channelID}&first=1`, { // get other info
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
    })
    .then(resp2 => resp2.json())
    .then((resp2) => {
    if(resp2.data == "") {
        const embed = new Discord.MessageEmbed()
        .setColor(`${config.COLOR}`)
        .addField(`:white_small_square: No Clips Found`, `I was unable to find any clips associated with the [${resp1.data[0].display_name}](https://twitch.tv/${resp1.data[0].display_name})'s channel.`)
        .setFooter('If you believe this is an error, contact a developer.')
        message.channel.send(embed)
        return
    }
    const clipUrl = resp2.data[0].url 
    const clipStreamer = resp2.data[0].broadcaster_name
    const clipperName = resp2.data[0].creator_name
    const clipperID = resp2.data[0].creator_id
    const clipTitle = resp2.data[0].title 
    const clipViews = resp2.data[0].view_count
    const clipCreatedAt = resp2.data[0].created_at
    const clipThumbnailURL = resp2.data[0].thumbnail_url
    
    const embed = new Discord.MessageEmbed()
    .setTitle(`:link: ${clipStreamer}'s Top Clip`)
    .setDescription(`**➔ Clip Title:** ${clipTitle}
    **➔ Clip Views:** ${clipViews}
    **➔ Clipped At:** ${moment.utc(`${clipCreatedAt}`).format('MMMM Do YYYY, h:mm:ss A')} UTC
    **➔ Clipped By: ** [${clipperName}](https://twitch.tv/${clipperName})`)
    .setURL(`${clipUrl}`)
    .setColor(`${config.COLOR}`)
    .setThumbnail(`${resp1.data[0].profile_image_url}`)
    message.channel.send(embed).then(message.channel.send(`${clipUrl}`))
    
    })
    }
    })  //22
} else { 
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField(`Error 400`, `You must provide a channel name.`)
    message.channel.send(embed)

}
log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
}} // async -> exports