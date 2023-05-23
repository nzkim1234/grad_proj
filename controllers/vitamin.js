const db = require('../config/config');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');

module.exports = {
    postAddVitamin : async (req, res, next) => {
        console.log(req.body)
        const keysArray = Object.keys(req.body);
        db.query(`SELECT * FROM ${req.body.seq}_data WHERE prod_name = ?`, req.body.prod_name, (err, row) => {
            if (row.length > 0) {
                console.log('test');
                console.log('product already exists');
                return res.send(400).end();
            }
            else {
                console.log(`INSERT INTO ${req.body.seq}_data (${keysArray[1]}) VALUES (${req.body[keysArray[1]]})`);
                console.log(keysArray.length);
                db.query(`INSERT INTO ${req.body.seq}_data (prod_name) VALUES (?)`,req.body.prod_name, (err, row) =>{
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('added product')
                    }
                });
                for (let i = 2; i < keysArray.length; i++){ 
                    db.query(`UPDATE ${req.body.seq}_data SET ${keysArray[i]} = ? WHERE (prod_name = ?)`,[req.body[keysArray[i]], req.body.prod_name], (err, row) =>{ 
                        if(err) {
                            console.log(err);
                            return res.send(400).end();
                        }
                        else{
                            console.log('done');
                            return res.send(200).end();
                        }
                    });
                }   
            }
        });
    },

    getVitamin: async (req, res, next) => {
        const seq = req.query.seq;
        db.query(`SELECT * FROM ${seq}_data`, (err, row) => {
            if (err){
                console.log(err);
                return res.send(400);
            }

            if (row) {
                console.log(row)
                return res.send(row).end();
            }
        });
    }
}