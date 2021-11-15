const config = require('../../../config')
const Discord = require('discord.js')
var fetch = require('node-fetch');
const moment = require('moment')
const { log } = require('../../util/log')

module.exports = {
    name: 'channel',
    desciption: 'Get the information for a given Twitch channel.',
    roles: null,
    async execute(client, message, args) {
    if (args[0]) {
    const channelName = args[0] 
    
    const ClientID = '81ws43kaah5gxsp2gzgzfer7wx6yzd'
    const Auth = 'l50kwnq3frcqjaqqzpsjgutdatc6n3'



// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, { // get user id
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }}).then(resp1 => resp1.json()).then((resp1) => {
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX




    if (resp1.data == ""){
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField(`Error 404`, `Sorry! I was unable to find the channel: \`${channelName}\``)
    message.channel.send(embed)
    } else {
    const channelID = resp1.data[0].id || "Unknown"
    fetch(`https://api.twitch.tv/helix/users/follows?to_id=${channelID}`, { // get follower count
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
    })
    .then(resp2 => resp2.json())
    .then((resp2) => {
    fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${channelID}`, { // get follower count
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
    })
    .then(resp3 => resp3.json())
    .then((resp3) => {
        const displayName = resp1.data[0].display_name || 'Unknown'
        const streamerType = resp1.data[0].broadcaster_type || 'Normal'
        const profileImage = resp1.data[0].profile_image_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        const createdAt = resp1.data[0].created_at || 'Unknown'
        var createdAtDate = moment.utc(`${createdAt}`).format("MMM Do, YYYY")
        const totalViews = resp1.data[0].view_count || 'None'
        const totalFollowers = resp2.total || 'None'
        const streamerEmbed = new Discord.MessageEmbed()
        .setTitle(`:link: ${displayName}'s Channel`)
        .setThumbnail(`${profileImage}`)
        .setColor('#a52183')
        .setURL(`https://twitch.tv/${channelName}`)
        .setDescription(`**➔ Channel Name:** ${displayName}\n**➔ Channel ID:** ${channelID}\n**➔ Streamer Type:** ${streamerType}\n**➔ Total Views:** ${totalViews}\n**➔ Followers:** ${totalFollowers}\n**➔ Created On:** ${createdAtDate}`)
        message.channel.send(streamerEmbed)
    
    })
    })}
    })  //22
} else { 
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField(`Error 400`, `You must provide a channel name.`)
    message.channel.send(embed)
}
log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`)
}} // async -> exports