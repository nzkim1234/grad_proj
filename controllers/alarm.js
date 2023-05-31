const db = require('../config/config');

module.exports = {
    postAddAlarm: async(req, res, next) => {
        const [seq, time, days, alarm_name, box] = [req.body.seq, req.body.time, req.body.days, req.body.alarmname, req.body.box];
        db.query(`INSERT INTO ${seq}_alarm (alarm_name, alarm_time, days, box) VALUES (?,?,?,?)`,[alarm_name, time, days, box], (err, row) => {
            if(err) {
                console.log(err)
                return res.send(err).end();
            }
            else{
                return res.send(200).end();
            }
        });

    },

    getAlarm: async(req, res, next) => {
        const seq = req.query.seq;
        db.query(`SELECT * FROM ${seq}_alarm`, (err, row) => {
            if (err){
                console.log(err);
                return res.send(400);
            }

            if (row) {
                console.log(row)
                return res.send(row).end();
            }
        });
    },
    
    postRemoveAlarm: async(req, res, next) => {
        const [seq, alarm_name] = [req.body.seq, req.body.alarmname];
        db.query(`DELETE FROM ${seq}_alarm WHERE(alarm_name = ?)`, alarm_name, (err, row) => {
            if(err){
                return res.send(400).end();
            }
            else{
                return res.send(200).end();
            }
        })
    },
    
    postEditAlarm: async(req, res, next) => {
        const [seq, time, days, new_alarm_name, box, vitamin, alarm_name] = [req.body.seq, req.body.time, req.body.days, req.body.newalarmname, req.body.box, req.body.vitamin, req.body.alarmname];
        db.query(`update ${seq}_alarm SET alarm_name = ?, alarm_time = ?, days = ?, box = ?, vitamin = ? where (alarm_name = ?)`, [new_alarm_name, time, days, box, vitamin, alarm_name], (err, row) => {
            if(err) {
                console.log(err);
                return res.status(400).end();
            }
            else {
                return res.status(200).end();
            }
        });
    },
}