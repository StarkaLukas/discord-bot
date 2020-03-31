const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./auth').token;
const insultFilename = 'insults.csv';
const amountInsults = 4;

client.on('ready', () => {
    console.log('Bot started...');
});

client.on('message', (msg) => {
    console.log('message received: ' + msg);
    if(msg.conent.includes('/insult')){
        if(msg.content.includes('@')){
            let toInsult = getGuy(msg);
            msg.channel.send(getInsult() + " @" + toInsult);
        }
    }else{
        msg.channel.send("I know you're really angry but please mention who you want to insult!");
    }
});

client.login(token);

function getGuy(msg){
    let toInsult = msg.content.replace('/insult', '');

    for(const member of msg.channel.members){
        if(toInsult.includes(member[1]['user'].id)){
            return member[1]['user'].id;
        }
    }
}

function getInsult(){
    let insultNumber = Math.floor(Math.random() * amountInsults);
    const insults = readInsults(insultFilename);
    console.log("insults: " + insults);
    return insults[insultNumber];
}

function readInsults(fileName){
    const fs = require('fs');
    const insults = [];
    fs.readFile(filename, {encoding: 'utf-8'}, (err, data) =>{
        if(err){
            console.log(err.message);
        }else{
            let parts = data.split('\n');
            for(let part in parts){
                insults.add(part);
            }
        }
    });
    return insults;
}