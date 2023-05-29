const db = require('../config/config');

module.exports = {
    postAddAlarm: async(req, res, next) => {
        const [seq, time, repeat, label, box, vitamin] = [req.body.seq, req.body.time, req.body.repeat, req.body.label, req.body.box, req.body.vitamin];
        db.query(`INSERT INTO ${seq}_alarm (time, repeat, label, box, vitamin) VALUES (${time}, ${repeat}, ${label}, ${box}, ${vitamin})`, (err, row) => {
            if(err) {
                return res.send(400).end();
            }
            else{
                return res.send(200).end();
            }
        });

    },

    getAlarm: async(req, res, next) => {

    },
    
    postRemoveAlarm: async(req, res, next) => {

    },
    
    postEditAlarm: async(req, res, next) => {

    },
}