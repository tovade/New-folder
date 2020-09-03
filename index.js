const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db')
const logs = require('discord-logs');
logs(client);


client.on('messageDelete', message => {
    if(message.author === null) return;
		

   let logChannel = db.get(`logchannel_${message.guild.id}`);
   
    if(!logChannel) return;

    let deletedMessageEmbed = new MessageEmbed()
    .setColor('BLACK')
    .setTitle('Deleted Message')
    .setDescription('A message has been deleted.')
    .addFields({name: 'Author', value: message.member.user.tag, inline: true }, 
    {name: 'Channel', value: `#${message.channel.name} `, inline: true},
		{name: 'Message: ', value: message.content || 'Can\'t Display'})
    .setTimestamp();

    client.channels.cache.get(logChannel).send(deletedMessageEmbed);

 });

client.on('roleCreate', role =>{

let logChannel = db.get(`logchannel_${role.guild.id}`);

if(!logChannel) return;

let roleCreatedEmbed = new MessageEmbed()
.setColor('BLACK')
.setTitle('Role Created')
.setDescription('A new role has been made.')
.addFields({name: 'Role Name: ', value: role.name, inline: true},
{name: 'Role ID: ', value: role.id, inline: true})
.setTimestamp();

client.channels.cache.get(logChannel).send(roleCreatedEmbed);
});

client.on('roleDelete', role => {

let logChannel = db.get(`logchannel_${role.guild.id}`);

if(!logChannel) return;

let roleDeleteEmbed = new MessageEmbed()
.setColor('BLACK')
.setTitle('Role Deleted')
.setDescription('A role has been deleted')
.addFields({name: 'Role Name: ', value: role.name, inline: true},
{name: 'Role ID: ', value: role.id})
.setTimestamp();

client.channels.cache.get(logChannel).send(roleDeleteEmbed);
});

client.on('messageUpdate', (oldMessage, newMessage) => {

if(newMessage.author === null) return;

let logChannel = db.get(`logchannel_${newMessage.guild.id}`);

if(!logChannel) return;

if (newMessage.author.id === client.user.id) return
if(newMessage.content === oldMessage.content) return;

let messageEditEmbed = new MessageEmbed()
.setColor('BLACK')
.setTitle('Message Edited')
.setDescription("A message has been edited")
.addFields({name: 'Message Author: ', value: `${newMessage.author.tag}(${newMessage.author.id})`}, 
{name: "Message Link: ", value: newMessage.url, inline: true},
{name: "Message ID: ", value: newMessage.id, inline: true},
{name: "Message Before: ", value: oldMessage.content || 'Can\'t Display' },
{name: "Message After: ", value: newMessage.content || 'Can\'t Display'})
.setTimestamp();

client.channels.cache.get(logChannel).send(messageEditEmbed);
});

client.on('emojiCreate', (emoji) => {
  let logChannel = db.get(`logchannel_${emoji.guild.id}`);
  if(!logChannel) return;
  
  const emojiBed = new MessageEmbed()
      .setTitle("New Emoji Created")
      .setDescription(`Emoji: **${emoji}** was created`)
      .setColor("GREEN")
      .setTimestamp();
      client.channels.cache.get(logChannel).send(emojiBed);

});

client.on('channelCreate', channel => {
	let logChannel = db.get(`logchannel_${channel.guild.id}`);
  if(!logChannel) return;

	let channelCreateEmbed = new MessageEmbed()
	.setColor("BLACK")
	.setTitle("Channel Created")
	.setDescription("A new channel has been created")
	.addFields({name: "Channel: ", value: `${channel.name}(${channel.id})`})
  .setTimestamp();

  client.channels.cache.get(logChannel).send(channelCreateEmbed);
});

client.on('channelDelete', channel => {
	let logChannel = db.get(`logchannel_${channel.guild.id}`);
  if(!logChannel) return;

	let channelDeleteEmbed = new MessageEmbed()
	.setColor("BLACK")
	.setTitle("Channel Deleted")
	.setDescription("A channel has been deleted")
	.addFields({name: "Channel: ", value: `${channel.name}(${channel.id})`})
  .setTimestamp();

  client.channels.cache.get(logChannel).send(channelDeleteEmbed);
});
client.on('emojiDelete', (emoji) => {
  let logChannel = db.get(`logchannel_${emoji.guild.id}`);
  if(!logChannel) return;
const EmojDembed = new MessageEmbed()
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji: **${emoji}** was deleted`)
      .setColor("RED")
      .setTimestamp();
      client.channels.cache.get(logChannel).send(EmojDembed)
});
client.on('guildBanAdd', (guild, user) => {
  let logChannel = db.get(`logchannel_${guild.id}`);
  if(!logChannel) return;
  
	let Banbed = new MessageEmbed()
  .setTitle("Member Banned")
  .setDescription(`${user.tag} has been banned from ${guild.name}.`)
  .setColor("RED")
  .setThumbnail(user.displayAvatarURL())
  .setTimestamp();

  client.channels.cache.get(logChannel).send(Banbed)
});
client.on('guildBanRemove', (guild, user) => {
  let logChannel = db.get(`logchannel_${guild.id}`);
  if(!logChannel) return;
  
	let unBanbed = new MessageEmbed()
  .setTitle("Member Unbanned")
  .setDescription(`${user.tag} has been unbanned from ${guild.name}.`)
  .setColor("RED")
  .setThumbnail(user.displayAvatarURL())
	.setTimestamp();
	
  client.channels.cache.get(logChannel).send(unBanbed)
});
client.on("guildMemberRoleAdd", (member, role) => {
    let logChannel = db.get(`logchannel_${member.guild.id}`);
    if(!logChannel) return;
    let roleAddbed = new MessageEmbed()
    .setTitle(`Role added to ${member.displayName}!`)
    .addField(`added role:`, `${role}` )
    client.channels.cache.get(logChannel).send(roleAddbed)
  
  });
  client.on("guildMemberRoleRemove", (member, role) => {
     let logChannel = db.get(`logchannel_${member.guild.id}`);
    if(!logChannel) return;
    let roleRedbed = new MessageEmbed()
    .setTitle(`Role removed from ${member.displayName}!`)
    .addField(`removed role:`, `${role}` )
    client.channels.cache.get(logChannel).send(roleRedbed)
  });
  client.login('TOKEN HERE')