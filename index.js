// Some constants don't miss with them
const Discord = require("discord.js");
const { prefix, token } = require("./config.json"); //Prefix is the symbol you type before the command for example !play in rythm I can't show you the file as it's contain my token :D
const client = new Discord.Client();
const http = require('http');
const express = require('express');
const app = express();
const modColor = '#ee3333';
// Shit for making bot alive
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// A message to print when the bot is working
client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("sci!help");

});

// when someone send a message, all commands are being written here
client.on("message", message => {
    if(message.author.bot != client.user.id) { // Checking if the message sent from a human
      // Check for the embed contents when you run !d bump
        try {
            message.embeds.forEach( embed => {
                let desc = embed.description;
                // message.channel.send(embed.description); // Debugging line
                if(desc.search(/bump done/i) != -1) { // if the embed contains bumb done, send a message with a gif for the user who done it
                    message.channel.send(`Thanks for helping the server ${desc.substring(0, desc.indexOf(','))} \n https://tenor.com/810B.gif`);
                } else if(desc.search(/Please wait another/i) != -1) { // if it does have please wait another... it will send another message
                    message.channel.send(`Thank you for trying to help the server ${desc.substring(0, desc.indexOf(','))}, try again later https://tenor.com/G8M4.gif`);
                }
            });
        } catch(err) { // if something goes wrong it won't work
            return;
        }
    }

    if(!message.author.bot) { // Checking if the message sent from a human
      // .toLowerCase() is to convert the command to lowercase, this step to make the command case insensitive
        if(message.content.toLowerCase().startsWith(`${prefix}ping`)) {
            message.channel.send("Pong");
        }
        if(message.content.startsWith(`${prefix}help`)) {
            message.channel.send("Sorry, this bot is under construction");
        }
    }
  
      if(message.content.toLowerCase().startsWith(`${prefix}admit`)) {
        // Admit code
        let toAdmit = message.mentions.members.first(); // Get the mentioned member
        let member = message.guild.roles.find(role => role.name === 'Member'); // save the 'Member' role in a variable
        let newMember = message.guild.roles.find(role => role.name === 'NEW-MEMBER'); // Save the 'NEW-MEMBER' role in a variable
        let admitted = new Discord.RichEmbed(); // creates a new embed
        // create the embed
        admitted.setAuthor(message.author.username, toAdmit.displayAvatarURL).
        setColor(modColor).
        setDescription(`${toAdmit} was admitted by ${message.author}`)
        .setImage(toAdmit.avatarURL);
        if(message.member.roles.some(role => role.name === 'Minor Staff Permissions')
          || message.member.roles.some(role => role.name === 'Staff-Ping')) { // check if the use who uses the command have 'Minor Staff Permissions' or 'Staff-Ping' role.
            toAdmit.addRole(member); // adds the 'Member' role
            toAdmit.removeRole(newMember) // removes the 'NEW-MEMBER' role
            .catch(() => {
              message.channel.send("Something went wrong"); // Send a message if something goes wrong
            });
          // sends a message in #mod-log channel after 4 seconds
            setTimeout(() => {
              client.channels.get('668991257170935818').send(admitted)
            }, 4000);
            
        }
    }
  
  // Detention
  
  if(message.content.toLowerCase().startsWith(`${prefix}det`)) {
        let toDetention = message.mentions.members.first();
        let member = message.guild.roles.find(role => role.name === 'Member');
        let detention = message.guild.roles.find(role => role.name === 'Detention');
        let detentioned = new Discord.RichEmbed();
        detentioned.setAuthor(message.author.username, toDetention.displayAvatarURL).
        setColor(modColor).
        setDescription(`${toDetention} was sent to Detention by ${message.author}`)
        .setImage(toDetention.avatarURL);
        if(message.member.roles.some(role => role.name === 'Minor Staff Permissions')
          || message.member.roles.some(role => role.name === 'Staff-Ping')) {
            toDetention.addRole(detention);
            toDetention.removeRole(member)
            .catch(() => {
              message.channel.send("Something went wrong");
            });
            setTimeout(() => {
              client.channels.get('668991257170935818').send(detentioned)
            }, 4000);
            
        }
    }
  
  // Remove Detention
  
    if(message.content.toLowerCase().startsWith(`${prefix}rdet`)) {
        let toDetention = message.mentions.members.first();
        let member = message.guild.roles.find(role => role.name === 'Member');
        let detention = message.guild.roles.find(role => role.name === 'Detention');
        let detentioned = new Discord.RichEmbed();
        detentioned.setAuthor(message.author.username, toDetention.displayAvatarURL).
        setColor(modColor).
        setDescription(`${toDetention} was removed from detention by ${message.author}`)
        .setImage(toDetention.avatarURL);
        if(message.member.roles.some(role => role.name === 'Minor Staff Permissions')
          || message.member.roles.some(role => role.name === 'Staff-Ping')) {
            toDetention.removeRole(detention);
            toDetention.addRole(member)
            .catch(() => {
              message.channel.send("Something went wrong");
            });
            setTimeout(() => {
              client.channels.get('668991257170935818').send(detentioned)
            }, 4000);
            
        }
    }
})

// https://tenor.com/810B.gif
// https://tenor.com/G8M4.gif

client.login(token);
