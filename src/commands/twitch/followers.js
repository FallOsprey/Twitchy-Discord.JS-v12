const config = require('../../../config.json')
const Discord = require('discord.js')
var fetch = require('node-fetch');
const moment = require('moment')
const { log } = require('../../util/log')

module.exports = {
    name: 'followers',
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
    .addField(`Error 404`, `Sorry! I was unable to find the channel: \`${channelName}\``)
    message.channel.send(embed)
    } else {
    const channelID = resp1.data[0].id || "Unknown"
    fetch(`https://api.twitch.tv/helix/users/follows?to_id=${channelID}`, { // get other info
    headers: {
        'Authorization': `Bearer ` + `${Auth}`,
        'Client-Id': `${ClientID}`
    }
    })
    .then(resp2 => resp2.json())
    .then((resp2) => {
        const displayName = resp1.data[0].display_name || 'Unknown'
        const profileImage = resp1.data[0].profile_image_url || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        const totalFollowers = resp2.total
        if (totalFollowers < 5) {
            const embed = new Discord.MessageEmbed()
            .setAuthor(`${displayName}`, `${profileImage}`, `https://twitch.tv/${displayName}`)
            .setColor(`${config.COLOR}`)
            .setDescription(`${displayName} currently has **__${totalFollowers}__** followers.`)
            message.channel.send(embed)
        } else { 
        const follower1 = resp2.data[0].from_name 
        const follower2 = resp2.data[1].from_name 
        const follower3 = resp2.data[2].from_name 
        const follower4 = resp2.data[3].from_name
        const follower5 = resp2.data[4].from_name
        const embed = new Discord.MessageEmbed()
    .setAuthor(`${displayName}`, `${profileImage}`, `https://twitch.tv/${displayName}`)
    .setColor(`${config.COLOR}`)
    .setDescription(`**${displayName}** currently has **__${totalFollowers}__** followers.\n\n**Recent Followers:**\n- ${follower1}\n- ${follower2}\n- ${follower3}\n- ${follower4}\n- ${follower5}`)
    message.channel.send(embed)
        }
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