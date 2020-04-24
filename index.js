const Discord = require("discord.js");
const { prefix, token } = require("./config.json"); //Prefix is the sympol you type before the command for example !play in rythm I can't show you the file as it's contain my token :D
const client = new Discord.Client();
const http = require("http");
http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-type": "text/plain"
    });

    res.writeHead(200, {
        "Content-type": "text/plain"
    });
    res.write("Hey");
    res.end();
}).listen(4000);

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