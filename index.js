const config = require('./config/config.json')
const events = require('./bot/events.js');
const util = require('./util/util.js');
const commands = require('./bot/commands.js');
const token = require('./config/token.json');

const Discord = require("discord.js"),
client = new Discord.Client(),
settings = {
    prefix: config.prefix,
    token: token.token
};

const { Player } = require("discord-player");
const player = new Player(client);
client.player = player;

client.player
    .on('trackStart', events.trackStart)
    .on('trackAdd', events.trackAdd)
    .on('playlistAdd', events.playlistAdd)
    .on('searchResults', events.searchResults)
    .on('searchInvalidResponse', events.searchInvalidResponse)
    .on('searchCancel', events.searchCancel)
    .on('noResults', events.noResults)
    .on('queueEnd', events.queueEnd)
    .on('channelEmpty', events.channelEmpty)
    .on('botDisconnect', events.botDisconnect)
    .on('error', events.error)

client.on("ready", () => {
    console.log("Viibez Ready.");
});

client.on("message", async (message) => {
    commands.execute(message, client, settings);
});

client.login(settings.token);