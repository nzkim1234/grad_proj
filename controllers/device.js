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

client.on('message', function (topic, message) {
    console.log('1234', message.toString())
});

module.exports = {
    postSendDevice : async(req, res, next) => {
        const [seq, box, intake] = [req.body.seq, req.body.box, req.body.intake];
        client.publish('todevice', box+intake, (err) => {
            if (err) {
            console.log(err);
            return res.send(400).end();
            }
            else {
                console.log("success!");
                return res.send(200).end();
            }
        });
        
    }
}