const db = require('../config/config');
const mqtt = requite('mqtt');
const client  = mqtt.connect({
    port: 1883,
    host: 'localhost',
    clientId: 'nodejs-client'
  })
  
  client.on('connect', function () {
    client.subscribe('deviceResponse', function (err) {
      if (!err) {
        client.publish('deviceRespose', 'mqtt connected')
      }
    })
  });
  
  client.on('message', function (topic, message) {
    console.log(message.toString())
  });
module.exports = {
    getActiveDevice : async(req, res, next) => {
        const box = req.box;
        console.log(box);
    }
}