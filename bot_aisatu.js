const Discord = require('discord.js');
const client = new Discord.Client();
const Commando = require('discord.js-commando');
const axios = require('axios');
const queue = new Map();

//ログイン確認
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//簡易的なコマンド
client.on('message', msg => {
	//単純な返答
    if (msg.content === 'hello') {
        msg.reply('hello!');
    }
	//ランダムで返答される
    else if (msg.content === '数字') {
        
        var random = Math.floor( Math.random() * 3 );

        if(random == 1){
            msg.reply('1');
        }else if(random == 2){
            msg.reply('2');
        }else{
            msg.reply('3');
        }
    }
});

//占いシステム
client.on('message', message => {
    if (message.content === '占い') {
        const fortunes = ['大吉', '中吉', '小吉', '吉', '凶'];
        const result = fortunes[Math.floor(Math.random() * fortunes.length)];
        message.channel.send(`今日の運勢は...${result}です！`);
    }
});

//入退室ログ
const logId = '12345678901234567890';//ログを表示するチャンネルのid
client.on('voiceStateUpdate', (oldState, newState) => {
    const textChannel = client.channels.cache.get(logId);

    // bot自身の場合は無視する
    if (oldState.member.id === client.user.id || newState.member.id === client.user.id) return;

    if (oldState.channel === null && newState.channel !== null) {
        // ボイスチャットに参加
        textChannel.send(newState.member.displayName + 'がボイスチャットに参加しました。');
    } else if (oldState.channel !== null && newState.channel === null) {
        // ボイスチャットから退出
        textChannel.send(oldState.member.displayName + 'がボイスチャットを退出しました。');
    }
});

//天気システム
client.on('message', message => {
    if (message.content.startsWith('tenki')) {
        const args = message.content.split(' ');
        if (args.length !== 2) {
            return message.reply('使い方: tenki 都市名');
        }
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${args[1]}&appid=ここにapiのキーが入ります。`;
        axios.get(url)
            .then(res => {
                const weather = res.data;
                const temp = weather.main.temp - 273.15;
                const feelsLike = weather.main.feels_like - 273.15;
                const pressure = weather.main.pressure;
                const snow = weather.snow && weather.snow['1h'] || 0;
                message.reply(`いまの天気: ${weather.weather[0].description}
                    温度: ${temp.toFixed(1)}°C
                    最高気温: ${(weather.main.temp_max - 273.15).toFixed(1)}°C
                    最低気温: ${(weather.main.temp_min - 273.15).toFixed(1)}°C
                    感覚温度: ${feelsLike.toFixed(1)}°C
                    風速: ${weather.wind.speed}m/s
                    湿度: ${weather.main.humidity}%
                    気圧: ${pressure} hPa
                    積雪量: ${snow} mm`);
            })
            .catch(error => {
                console.log(error);
                message.reply('そのような名前の都市はわかりません。');
                message.reply(`Error: ${error}. URL: ${url}`);
            });
    }
});


//カスタムステータス
client.on('ready', () => {
    // Bot のログイン準備ができたらカスタムステータスを設定
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'サーバー',
            type: 'WATCHING'
        }
    });
});

client.login('botのトークンが入ります。');
