const Discord = require("discord.js");
const { prefix, token } = require("./config.json"); //Prefix is the symbol you type before the command for example !play in rythm I can't show you the file as it's contain my token :D
const client = new Discord.Client();
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.once("ready", () => {
    console.log("Ready!");
    client.user.setActivity("sci!help");

});


client.on("message", message => {
    if(message.author.bot != client.user.id) {
        try {
            message.embeds.forEach( embed => {
                let desc = embed.description;
                // message.channel.send(embed.description);
                if(desc.search(/bump done/i) != -1) {
                    message.channel.send(`Thanks for helping the server ${desc.substring(0, desc.indexOf(','))} \n https://tenor.com/810B.gif`);
                } else if(desc.search(/Please wait another/i) != -1) {
                    message.channel.send(`Thank you for trying to help the server ${desc.substring(0, desc.indexOf(','))}, try again later https://tenor.com/G8M4.gif`);
                }
            });
        } catch(err) {
            return;
        }
    }

    if(!message.author.bot) {
        if(message.content.startsWith(`${prefix}ping`)) {
            message.channel.send("Pong");
        }
        if(message.content.startsWith(`${prefix}help`)) {
            message.channel.send("Sorry, this bot is under construction");
        }
    }
  
      if(message.content.startsWith(`${prefix}admit`)) {
        let toAdmit = message.mentions.members.first();
        let member = message.guild.roles.find(role => role.name === 'Member');
        let newMember = message.guild.roles.find(role => role.name === 'NEW-MEMBER');
        let admitted = new Discord.RichEmbed();
        admitted.setAuthor(message.author.username, toAdmit.displayAvatarURL).
        setColor('RANDOM').
        setDescription(`${toAdmit} was admitted by ${message.author.username}`)
        .setImage(toAdmit.avatarURL);
        if(message.member.roles.some(role => role.name === 'Minor Staff Permissions')
          || message.member.roles.some(role => role.name === 'Staff-Ping')) {
            toAdmit.addRole(member);
            toAdmit.removeRole(newMember)
            .catch(() => {
              message.channel.send("Something went wrong");
            });
            setTimeout(() => {
              client.channels.get('668991257170935818').send(admitted)
            }, 4000);
            
        }
    }
    // if(message.author.id === client.user.id) {
    //     if(message.author.bot) {
    //         message.channel.send(`${message.author} sent this`);
    //         message.channel.send(`A bot sent this`);
            
    //     }
    // }
})

// https://tenor.com/810B.gif
// https://tenor.com/G8M4.gif

client.login(token);
