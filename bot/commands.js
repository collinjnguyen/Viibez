const config = require('../config/config.json');

function execute(message, client, settings) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const query = args.join(' ');

    if (command === config.commands.player.play_song){
        client.player.play(message, query);
    } else if (command === config.commands.player.skip_song){
        client.player.skip(message);
    } else if  (command === config.commands.player.pause_song) {
        client.player.pause(message);
    } else if  (command === config.commands.player.resume_song) {
        client.player.resume(message);
    } else if  (command === config.commands.player.previous_song) {
        client.player.back(message);
    } else if (command === config.commands.queue.stop_queue){
        client.player.stop(message);
        message.channel.send("cya");
    } else if (command === config.commands.queue.clear_queue) {
        client.player.clearQueue(message);
    } else if (command === config.commands.queue.shuffle_queue) {
        client.player.shuffle(message);
    }

    // const videoData = await ytdl.getBasicInfo(query)
    // if (videoData.videoDetails.isLiveContent && !this.options.enableLive) return this.emit('error', 'LiveVideo', message)
    // const lastThumbnail = videoData.videoDetails.thumbnails.length - 1 /* get the highest quality thumbnail */
    // trackToPlay = new Track({
    //     title: videoData.videoDetails.title,
    //     url: videoData.videoDetails.video_url,
    //     views: videoData.videoDetails.viewCount,
    //     thumbnail: videoData.videoDetails.thumbnails[lastThumbnail],
    //     lengthSeconds: videoData.videoDetails.lengthSeconds,
    //     description: videoData.videoDetails.description,
    //     author: {
    //         name: videoData.videoDetails.author.name
    //     }
    // }, message.author, this)

    // _createQueue (message, track)
    // _addTrackToQueue (message, track)

}

exports.execute = execute;