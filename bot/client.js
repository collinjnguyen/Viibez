const config = require('./config/config.json')

const Discord = require("discord.js"),
client = new Discord.Client(),
settings = {
    prefix: config.prefix,
    token: config.token
};

module.exports.discordClient = Discord;