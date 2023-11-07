const path = require('path');
const fs = require('fs');

module.exports = {
    getProfileImage : async (req, res, next) => {
        const profile_img = req.query.profile_img;
	console.log(profile_img);
        console.log(`${path.resolve(__dirname, "../public/images/")}/${profile_img}_image.png`);
        const fileExist = (fs.existsSync(`${path.resolve(__dirname, "../public/images/")}/${profile_img}_image.png`));
        var image = null;
        if (fileExist){
            image = fs.readFileSync(`${path.resolve(__dirname, "../public/images/")}/${profile_img}_image.png`);
        }
        else {
            image = fs.readFileSync(`${path.resolve(__dirname, "../public/images/")}/default_image.png`);
        }
        return res.status(200).send(image);
    }
}
