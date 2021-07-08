
const code = require('../constants').http_codes;
const msg = require('../constants').messages;
const status = require('../constants').status;
const commondao = require('../common/commonDao');
const userdao = require('../user/userDao');
const util = require('../app util/util');
const jwt = require('jsonwebtoken')

async function verifyToken(req, res, next) {  
    let token = req.headers['authorization']
    await jwt.verify(token, process.env.USER_SECRET, (err) => {
        if (err) {
            
            return res.json({ code: code.unAuthorized, message: msg.invalidToken })
        }
        else {
            let obj = util.decodeToken(token)
            let query = { _id: obj.id }
            
            userdao.findone(query).then((data) => {

                if (!data) {
                    return res.json({ code: code.unAuthorized, message: msg.invalidToken })
                } else {
                    next();
                }
            }).catch((err) => {
                return res.json({ code: code.internalError, message: msg.internalServerError }) //msg.internalServerError })
            })
        }
    })
}

module.exports = {
    verifyToken
}