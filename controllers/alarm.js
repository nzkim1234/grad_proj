const db = require('../config/config');

module.exports = {
    postAddAlarm: async(req, res, next) => {
        const [seq, time, days, alarm_name, box, vitamin] = [req.body.seq, req.body.time, req.body.days, req.body.alarmname, req.body.box, req.body.vitamin];
        db.query(`INSERT INTO ${seq}_alarm (time, days, alarm_name, box, vitamin) VALUES (${time}, ${days}, ${alarm_name}, ${box}, ${vitamin})`, (err, row) => {
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