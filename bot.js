const fs = require('fs');
const {prefix, token} = require("./config.json") ;
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone : true});
const superagent = require("superagent");
const config = require("./config.json")
require("./util/eventHandler")(bot)

bot.on("ready", async () => {
    console.log("Bot is functional")
    bot.user.setActivity(" Fortnite",{type: "STREAMING", url: "https://www.twitch.tv/sypherpk"})
})
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./commands/", (err,files) => {
    if(err) {
        console.log(err)
        message.channel.send("There was an error")
    } 
    let jsfile = files.filter(f => f.split(".").pop() === "js");

    jsfile.forEach((f,i) => {
        let pull = require(`./commands/${f}`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        })



    }
)})

bot.on("message", async message => {

if(message.author.bot) return;

if(message.channel.type === "dm") return;
let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray.slice(1);


if(!message.content.startsWith(prefix)) return;
let commandFile = bot.commands.get(cmd.slice(prefix.length) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length))))
if(commandFile) commandFile.run(bot, message , args);

})
bot.login(token)