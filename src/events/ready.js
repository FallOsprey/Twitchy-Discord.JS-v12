const { log } = require('../util/log')

module.exports = {
    async execute(client) {
      log('SUCCESS', `Bot started successfully as ${client.user.tag}`)
      log('SUCCESS', `Bot started successfully in ${client.guilds.cache.size} servers.`)
        
      client.guilds.cache.forEach(guild => {
      console.log(`${guild.name} | ${guild.id}`);
            
      const activities = [
        `${client.guilds.cache.size} servers!`,
        `${client.channels.cache.size} channels!`,
        `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users!`
      ];
  
      let i = 0;
      setInterval(() => client.user.setActivity(`=help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
      })
    }
}
