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
            const seq = parseInt(receive[0])
            const vseq = parseInt(receive[1])
            const taken = parseInt(receive[2])
            db.query(`UPDATE ${seq}_data SET taken = ${taken} WHERE (vseq = '${vseq}');`)
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
        const [seq, box, intake, vseq] = [req.body.seq, req.body.box, req.body.intake, req.body.vseq];
        var test = '';
        for(i = 0; i < box.length; i++){
            test += `${box[i]}${intake[i]}${vseq[i]} `
        }
        client.publish('todevice', `${seq} ${test} `, (err) => {
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