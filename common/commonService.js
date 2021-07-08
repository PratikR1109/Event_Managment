const util = require('../app util/util');
const code = require('../constants').http_codes;
const msg = require('../constants').messages;
const bcrypt = require('bcrypt');
const user = require('../schema/user')
const crypto = require('crypto');
const env = require('dotenv').config()
const userDao = require('../user/userDao');
const fs = require('fs');

function uploadPhoto(req, res) {

    let token = req.headers['authorization']
    let userToken = util.decodeToken(token)
    req._id = userToken.id
    req.newFile_name = [];

    let query = { _id: req._id }
    userDao.findone(query).then((data) => {
        if (data.imageUrl != '' && !(!data.imageUrl)) {
            var imageName = data.imageUrl.split("/")[3];
            req.image = imageName
            fs.unlink('./img/' + imageName, function (err) {
                if (err) {
                   return res.json({ code: 404, message: 'image not found' })
                }
            })
        } else {
            req.image = ''
        }

        util.upload(req, res, async function (err) {
            if (err) {
                return res.json({ code: code.badRequest, message: err })
            } else {
                const files = req.files;  
                let index, len;
                var filepathlist = []
                for (index = 0, len = files.length; index < len; ++index) {
                    let filepath = process.env.IMAGEPREFIX + files[index].path.slice(4,);
                    filepathlist.push(filepath)
                }
                return res.json({ code: code.created, message: msg.ok, data: filepathlist })
            }
        });
    })
}

module.exports = {
    uploadPhoto 
}