exports.parseCommand = (message) => {
    const myArgs = message.content.slice(1).trim().split(/ +/g);
    const myCommand = myArgs.shift().toLowerCase();
    return {
        args: myArgs,
        command: myCommand
    };
};
