//���̃t�@�C���̓R���\�[����ŃJ�X�^���G������id��\������v���O�����ł��B
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

client.login('������discord_bot�̃g�[�N��������܂��B');
