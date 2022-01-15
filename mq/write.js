const {COMMAND_QUEUE} = require("./connector");

function sendCommand(channel, msg) {
    channel.sendToQueue(COMMAND_QUEUE, Buffer.from(msg));
    console.info(`Sent ${msg} on queue ${COMMAND_QUEUE}`);
}

module.exports = {
    sendCommand: sendCommand
}