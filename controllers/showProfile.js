const path = require('path');
const fs = require('fs');

module.exports = {
    getProfileImage : async (req, res, next) => {
        const profile_img = req.query.profile_img;
        console.log(req);
        console.log(req.query)
        console.log(`${path.resolve(__dirname, "../public/images/")}/${profile_img}.png`);
        const fileExist = (fs.existsSync(`${path.resolve(__dirname, "../public/images/")}/${profile_img}`));
        if (fileExist){
            const image = fs.readFileSync(`${path.resolve(__dirname, "../public/images/")}/${profile_img}`);
            return res.status(200).send(image);
        }
        else {
            //const image = fs.readFileSync(`${path.resolve(__dirname, "../public/images/")}/default_image.png`);
            return res.status(400).end();
        }
    }
}
