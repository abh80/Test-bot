const beautify = require('beautify')
const {RichEmbed } = require("discord.js")

module.exports.run = async (client, message ,args) => {
   
    
    if(!args[0]) {
        message.channel.send("What are you evaluating use some common sense!")
    } 

    try {
        if(args.join(" ").toLowerCase().includes("token")) {
                return
        }
     
    const toEval = args.join(" ");
    const evaluated = eval(toEval);

    let embed = new RichEmbed()
    .setAuthor("EVALUATION", message.author.displayAvatarURL)
    .setColor(123456)
    .setTitle(`📥INPUT📥`)
    .setDescription(`\`\`\`js\n${toEval}\`\`\``)
    .addField(
          `📤OUTPUT📤`,
          `\`\`\`js\n${evaluated}\`\`\``,
          false
        )
    .addField(`📄TYPE📄`, `\`\`\`js\n${typeof evaluated}\`\`\``, false)
    .setFooter("OUTCOME: SUCCESS!", message.author.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);

    

    } catch(e) {
        message.channel.send("An error occured while evaluating the code")
        console.log(e)
        return;

    }
 
  

}
module.exports.config = {
    name: "eval",
    description: "evaluates a code",
    usage: "%eval",
    accessableby: "Members",
    aliases: ["si", "eval"]
}