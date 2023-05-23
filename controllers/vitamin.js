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
        const [ownerId, boxNum, boxAptNum] = [req.body.ownerId, req.body.boxNum, req.body.aptNum];
        const fileExist = (fs.existsSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`));
        
        if (fileExist){
            fs.rmSync(`${path.resolve(__dirname, "../public/images/")}/${boxNum}.png`);
            db.query('UPDATE box_table SET boxNum = ?, boxEmpty = ?, boxPwd = ?, boxAptNum = ?, ownerName = ?, updatedDate = ? WHERE boxNum = ?', [boxNum, 0, null, null, null, null, boxNum], (err, row) =>{
                if (err) return res.status(400).end();

                if (row) return res.status(200).send({ openedbox : boxNum});
                else return res.status(400).end();
            });
        }
        else return res.status(400).end();
    },

    postEmptyBox : async (req, res, next) => {
        db.query('SELECT * FROM box_table WHERE boxEmpty=?', req.body.find, (err, row) => {
            console.log(row);
            if (err) {
                return res.status(400).end();
            }

            if (row.length > 0) {
                return res.status(200).send({ emptyBox : row[0].boxNum});
            }
            else {
                return res.status(400).send({emptyBox : 0});
            }
            
        })
    }
}