const db = require('../config/config');

module.exports = {
    postBox : async (req, res, next) => {
        const [boxnum, vseq, seq] = [req.body.boxnum, req.body.vseq, req.body.seq];
        for(i = 0; i <boxnum.length; i++) {
            console.log(boxnum[i], vseq[i])
            db.query(`UPDATE ${seq}_boxs SET contain_vitamin = ${vseq[i]} WHERE (boxnum = ${boxnum[i]})`, (err, row) => {
                if (err){
                    return res.send(400).end();
                }
            });
        }
        return res.send(200).end();
    },
    getBox : async(req, res, next) => {
        db.query(`SELECT * FROM ${req.query.seq}_boxs`, (err, row) => {
            if (err){
                console.log(err);
                return res.send(400);
            }

            if (row) {
                console.log(row);
                return res.send(row).end();
            }
        });
    }
}