const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;
const insultFilename = './data/insults';
const amountInsults = 5;

client.on('ready', () => {
    console.log('Bot started...');
});

client.on('message', (msg) => {
    console.log('message received: ' + msg);
    if(msg.content.includes('$insult')){
        if(msg.content.includes('@')){
            let toInsult = getGuy(msg);
            msg.channel.send(getInsult().replace('@', `<@${toInsult}`));
        }else{
            msg.channel.send("I know you're really angry but please mention who you want to insult!");
        }
    }
});

client.login(token);

function getGuy(msg){
    return msg.content.split('@')[1];
}

function getInsult(){
    let insultNumber = Math.floor(Math.random() * amountInsults);
    const insults = require(insultFilename).insults;
    console.log("insults: " + JSON.stringify(insults));
    return insults[insultNumber];
}
