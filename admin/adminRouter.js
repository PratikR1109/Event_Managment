const adminRouter = require('express').Router();
const service = require('./adminService')
const validate = require('./adminValidator')
const actions = require('./adminAction')


adminRouter.route('/listuser')
    .get([validate.verifyToken], (req, res, next) => {
        actions.listuser(req, res, next)
    });
    adminRouter.route('/listsport')
    .get([validate.verifyToken], (req, res, next) => {
        actions.listsport(req, res, next)
    })
adminRouter.route('/userdetail')
    .get([validate.verifyToken], (req, res, next) => {
        actions.userdetail(req, res, next)
    });

adminRouter.route('/updateuser')
    .put([validate.verifyToken, validate.validateupdate], (req, res, next) => {
        actions.updateuser(req, res, next)
    });
adminRouter.route('/deactiveuser')
    .put([validate.verifyToken], (req, res, next) => {
        actions.deactiveuser(req, res, next)
    });
adminRouter.route('/deleteuser')
    .delete([validate.verifyToken], (req, res, next) => {
        actions.deleteuser(req, res, next)
    });
adminRouter.route('/resetpassword')
    .put([validate.verifyToken], (req, res, next) => {
        actions.resetpassword(req, res, next)
    });

adminRouter.route('/playerLocations')
    .get([], (req, res, next) => {
        actions.playerLocations(req, res, next)
    });

adminRouter.route('/playerRating')
    .get([], (req, res, next) => {
        actions.playerRating(req, res, next)
    });

adminRouter.route('/eventHours')
    .get([], (req, res, next) => {
        actions.eventHours(req, res, next)
    });

adminRouter.route('/sportLocations')
    .get([], (req, res, next) => {
        actions.sportLocations(req, res, next)
    });
    
adminRouter.route('/playerHours')
    .get([], (req, res, next) => {
        actions.playerHours(req, res, next)
    })

module.exports = adminRouter;