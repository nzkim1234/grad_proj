const db = require('../config/config');
// const mqtt = require('mqtt');

// const client  = mqtt.connect('mqtt://test.mosquitto.org')

// client.on('connect', function () {
//   client.subscribe('presence', function (err) {
//     if (!err) {
//       client.publish('presence', 'Hello mqtt')
//     }
//   })
// })

// client.on('message', function (topic, message) {
//   // message is Buffer
//   console.log(message.toString())
//   client.end()
// })
// client.on('message', function (topic, message) {
//     console.log(message.toString())
// });

module.exports = {
    getActiveDevice : async(req, res, next) => {
        const box = req.box;
        console.log(box);
    }
}