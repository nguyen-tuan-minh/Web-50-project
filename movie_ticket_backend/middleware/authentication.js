const jwt = require('jsonwebtoken')

const authentication =(req, res, next) => {
    const authorization = req.headers.Authorization
    if(!authorization){
        res.json(401).send("Token not found")
    } else {
        const token = authorization.split(' ')[1]
        try {
            const data = jwt.verify(token,"My_Private_Key")
            req.user = {
                id: data.id,
                username: data.username,
                type: data.type
            }
            next();
        } catch(err){
            res.status(401).send("Invalid token")
        }
    }
};

module.exports = authentication