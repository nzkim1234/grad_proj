module.exports = {
    getConnection : async (req, res, next) => {
        res.status(200).send('the server is opened and connected!');
    },
}