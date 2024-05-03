//このファイルはコンソール上でカスタム絵文字のidを表示するプログラムです。
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.guilds.cache.forEach(guild => {
        console.log(`Guild: ${guild.name}`);
        console.log(`Emojis:`);
        guild.emojis.cache.forEach(emoji => {
            console.log(`  ${emoji.name}: ${emoji.id}`);
        });
    });
});

client.login('ここにdiscord_botのトークンが入ります。');
