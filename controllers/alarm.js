const db = require('../config/config');

module.exports = {
    postAddAlarm: async(req, res, next) => {
        const [seq, time, days, alarm_name, box, vitamin] = [req.body.seq, req.body.time, req.body.days, req.body.alarmname, req.body.box, req.body.vitamin];
        console.log(days);
        db.query(`INSERT INTO ${seq}_alarm (alarm_name, alarm_time, days, box, vitamin) VALUES (${alarm_name}, ${time}, ${days}, ${box}, ${vitamin})`, (err, row) => {
            if(err) {
                console.log(err)
                return res.send(400).send(err).end();
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