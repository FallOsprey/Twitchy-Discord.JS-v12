const config = require('../../../config.json')
const Discord = require('discord.js')
var fetch = require('node-fetch');
const moment = require('moment')
const { log } = require('../../util/log')

module.exports = {
    name: 'stream',
    desciption: 'twitchs',
    roles: null,
    async execute(client, message, args) {
    const channelName = args[0] //will change later
    const ClientID = (`${config.ClientID}`)
    const Auth = (`${config.AuthKey}`)
if (args[0] === undefined){
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField(`Error 400`, `You must provide a channel name.`)
    message.channel.send(embed)
    return
}
    fetch(`https://api.twitch.tv/helix/streams?user_login=${channelName}`, {
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
})
.then(resp => resp.json())
.then((resp) => {
fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, {
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
})
.then(resp1 => resp1.json())
.then((resp1) => {
if (resp1.data[0] === undefined){
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .addField(`Error 404`, `Sorry! I was unable to find the channel: \`${channelName}\`.`)
    message.channel.send(embed)
    return;
}
if (resp.data[0] === undefined) { // if streamer exists, but is not live
    const username = resp1.data[0].display_name
    const embed = new Discord.MessageEmbed()
    .setColor(`${config.COLOR}`)
    .addField(`:white_small_square: User Is Not Live`, `Streamer [${username}](https://twitch.tv/${username}) is not currently live.`)
    .setFooter('If you believe this is an error, contact a developer.')
    message.channel.send(embed)
} else { // if streamer is live AND streamer exists
const profilePic = resp1.data[0].profile_image_url
const username = resp1.data[0].display_name
const streamID = resp.data[0].id
const streamerName = resp.data[0].user_name
const gameName = resp.data[0].game_name
const streamTitle = resp.data[0].title
const viewerCount = resp.data[0].viewer_count
var startTime = moment(`${resp.data[0].started_at}`).fromNow()
const thumbnailURL = resp.data[0].thumbnail_url
const matureWarning = resp.data[0].is_mature
const embed = new Discord.MessageEmbed()
.setTitle(`:link: ${streamerName}'s Stream`)
//.setThumbnail(`${profileImage}`)
.setColor('#a52183')
.setThumbnail(`${profilePic}`)
//.setImage(`${resp.data[0].thumbnail_url}`)
.setURL(`https://twitch.tv/${streamerName}`)
.setDescription(`➔ **Streamer:** ${streamerName}
**➔ Topic/Game:** ${gameName}
**➔ Viewers:** ${viewerCount}
**➔ Start Time:** ~${startTime}
**➔ Title:** \`\`\`${streamTitle}\`\`\``)
message.channel.send(embed)
}



})

.catch((err) => {
console.log(err)
});
}) 
log('EXECUTION', `${message.author.tag} (${message.author.id}) ran command: [ ${message} ] in ${message.guild.name}.`) 
    }
}