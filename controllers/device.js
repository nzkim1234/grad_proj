const db = require('../config/config');
const mqtt = require('mqtt');

const client  = mqtt.connect({
    port: 1883,
    host: 'localhost',
    clientId: 'example-client'
  });

client.on('connect', function () {
  client.subscribe('fromdevice', function (err) {})
  client.subscribe('todevice', function (err) {})
})

client.on('message', function (topic, message) {
    switch (topic) {
        case 'fromdevice':
            const receive = message.toString().split(" ");
            console.log(receive);
            const prod_name = receive[0]
            const seq = parseInt(receive[1])
            const taken = parseInt(receive[2])
            db.query(`UPDATE ${seq}_data SET taken = ${taken} WHERE (prod_name = '${prod_name}');`)
            break;
        case 'todevice':
            console.log(message.toString())
            break;
        default:
            break;
    }
});

module.exports = {
    postSendDevice: async(req, res, next) => {
        const [seq, box, intake, product_name] = [req.body.seq, req.body.box, req.body.intake, req.body.productname];
        client.publish('todevice', `${seq} ${box} ${intake} ${product_name}`, (err) => {
            if (err) {
            console.log(err);
            return res.send(400).end();
            }
            else {
                console.log("success!");
                return res.send(200).end();
            }
        });
    },
    getFromDevice : async(req, res, next) => {
        const [seq, box] = [req.query.seq, req.query.box];   
    }
}