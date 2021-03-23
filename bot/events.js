const Discord = require("discord.js");
const config = require("../config/config.json");

// TODO
// Create a basic embed function
// Create other embeds
// Vibe

module.exports = {
    trackStart: (message, track) => {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(track.title)
            .setURL(track.url)
            .setAuthor(`Now vibin to:`)
            .addFields(
                { name: 'Duration', value: `${track.duration}`, inline: true },
                { name: 'Author', value: `${track.author}`, inline: true },
                { name: 'Requested By', value: `${track.requestedBy}`, inline: true },
            )
            .setThumbnail(track.thumbnail)
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(embed);
    },
    trackAdd: (message, queue, track) => {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(track.title)
            .setURL(track.url)
            .setAuthor(`Vibe queued.`)
            .setThumbnail(track.thumbnail)
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(embed);
    },
    playlistAdd: (message, queue, playlist) => {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(playlist.title)
            .setURL(playlist.url)
            .setAuthor(`Playlist queued. (${playlist.tracks.length} vibes)`)
            .setThumbnail(playlist.thumbnail)
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(embed);
        console.log(playlist)
    },
    searchResults: (message, query, tracks) => {
        const embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`Vibes found for: ${query}`)
            .setAuthor('Select a vibe.')
            .setDescription(tracks.map((t, i) => `${i+1}. ${t.title}`))
            .setTimestamp()
            .setFooter(config.name);
        message.channel.send(embed);
    },
    searchInvalidResponse: (message, query, tracks, content, collector) => {
        if (content === 'cancel') {
            collector.stop()
            return message.channel.send('Search cancelled!')
        }
        message.channel.send(`You must send a valid number between 1 and ${tracks.length}.`)
    },
    searchCancel: (message, query, tracks) => {
        message.channel.send('Not a valid response. Send the command again.')
    },
    noResults: (message, query) => {
        message.channel.send(`No results found on YouTube for ${query}.`)
    },
    queueEnd: (message, queue) => {
        message.channel.send('No more vibes in the queue. cya')
    },
    channelEmpty: (message, queue) => {
        message.channel.send('No members in the voice channel. cya')
    },
    botDisconnect: (message) => {
        message.channel.send('I have been disconnected. cya')
    },
    error: (error, message) => {
        switch(error){
            case 'NotPlaying':
                message.channel.send('There are no vibes being played on this server.')
                break;
            case 'NotConnected':
                message.channel.send('You are not connected in any voice channel.')
                break;
            case 'UnableToJoin':
                message.channel.send('Unable to join voice channel. Check permissions.')
                break;
            case 'LiveVideo':
                message.channel.send('YouTube lives are not supported.')
                break;
            case 'VideoUnavailable':
                message.channel.send('This YouTube video is not available.');
                break;
            default:
                message.channel.send(`Something went wrong... Error: ${error}`)
        }
    }
}