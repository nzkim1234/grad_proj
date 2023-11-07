const db = require('../config/config');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

module.exports = {
    getSearchVitamin: async(req, res, next) => {
        const spawn = require('child_process').spawn;
        const result = spawn('python3', ['controllers/find.py', req.query.prodname], {
            env:{PYTHONPATH: '/home/ubuntu/.local/lib/python3.9/site-packages'}
        });
        result.stdout.on('data', function(data) {
            console.log(data.toString());
            return res.send(data.toString()).end();
        });
    },

    postAddVitamin : async (req, res, next) => {
        console.log(req.body)
        const keysArray = Object.keys(req.body);
        db.query(`SELECT * FROM ${req.body.seq}_data WHERE prod_name = ?`, req.body.prod_name, (err, row) => {
            if (row.length > 0) {
                console.log('product already exists');
                return res.send(400).end();
            }
            else {
                console.log(keysArray.length);
                db.query(`INSERT INTO ${req.body.seq}_data (prod_name) VALUES (?)`,req.body.prod_name, (err, row) =>{
                    if (err) {
                        console.log(err);
                        return res.send(400).end();
                    }
                    else {
                        console.log('added product')
                    }
                });
                for (let i = 0; i < keysArray.length; i++){ 
                    if (keysArray[i] == 'prod_name' || keysArray[i] == 'seq'){
                        continue
                    }
                    db.query(`UPDATE ${req.body.seq}_data SET ${keysArray[i]} = ? WHERE (prod_name = ?)`,[req.body[keysArray[i]], req.body.prod_name], (err, row) =>{ 
                        if(err) {
                            console.log(err);
                            return res.send(400).end();
                        }
                    });
                }
                console.log('done');
                return res.send(200).end();   
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
                for(i = 0; i < row.length; i++) { 
                    image = fs.readFileSync(`${path.resolve(__dirname, "../public/vImages/")}/${seq}_${row[i].prod_name}_image.png`);
                    row[i]['image'] = image.toString('base64');
                }
                console.log(row);
                return res.send(row).end();
            }
        });
    },

   postRemoveVitamin: async (req, res, next) => {
        const [seq, prod_name] = [req.body.seq, req.body.prod_name]       
        db.query(`DELETE FROM ${seq}_data WHERE (prod_name = '${prod_name}')`, (err, row) => {
            if (err){
                console.log(err);
                return res.send(400);
            }
            else{
                return res.send(200).end();
            }
        });
    },

    getRecommendVitamin: async(req, res, next) => {
        const [seq, vitamin_list, vitaminContain] = [req.query.seq, req.query.vitaminlist, req.query.vitamincontain];
	console.log(vitaminContain, vitamin_list);
	const spawn = require('child_process').spawn;
        const result = spawn('python3', ['controllers/recommend_eu2.py', vitamin_list, vitaminContain], {
            env:{PYTHONPATH: '/home/ubuntu/.local/lib/python3.9/site-packages'}
        });
        result.stdout.on('data', function(data) {
           console.log(data.toString());
           return res.send(data.toString()).end();
        });
        result.stderr.on('data', function(data) {
	    console.log('err');
            console.log(data.toString());
        });
    }

}
