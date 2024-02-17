const jwt = require('jsonwebtoken');
const secretKey = "$check@2024$";

async function fetchUser(req, res, next) {
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({
            error: "Please Login to continue"
        })
    }
    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;        
    } catch (error) {
        return res.status(401).send({
            error: "Invalid Credentials"
        })
    }
    next();
}

module.exports = fetchUser;