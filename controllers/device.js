const db = require('../config/config');
const mqtt = require('mqtt');

const client  = mqtt.connect({
    port: 1883,
    host: 'localhost',
    clientId: 'example-client'
  });

client.on('connect', function () {
  client.subscribe('fromdevice', function (err) {
    if (!err) {
      client.publish('fromdevice', 'formdevice mqtt connected')
    }
  })
  client.subscribe('todevice', function (err) {
    if (!err) {
      client.publish('todevice', 'todeivce mqtt connected')
    }
  })
})

// client.on('message', function (topic, message) {
//     console.log(message.toString())
// });
module.exports = {
    getActiveDevice : async(req, res, next) => {
        const [box, intake] = [req.query.box, req.query.intake];
        client.publish('todevice', box+intake);
        console.log(box+intake)
        return res.send(200).end();
    }
}