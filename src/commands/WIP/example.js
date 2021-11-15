const config = require('../../../config.json')

module.exports = {
    name: 'invites',
    desciption: 'Tests somethings',
    roles: null,
    async execute(client, message, args) {
        const total = message.client.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c)
        message.channel.send(`${total}`)
          
    
}}