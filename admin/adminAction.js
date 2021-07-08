const service = require('./adminService')
// const userService=require('../user/userService')

function listuser(req, res,next) {
    service.listuser(req, res,next)
}
function listsport(req, res,next) {
    service.listsport(req, res,next)
}
function userdetail(req, res,next) {
    service.userdetail(req, res,next)
}
function updateuser(req, res,next) {
    service.updateuser(req, res,next)
}
function deactiveuser(req, res,next) {
    service.deactiveuser(req, res,next)
}
function deleteuser(req, res,next) {
    service.deleteuser(req, res,next)
}
function resetpassword(req, res,next) {
    service.resetpassword(req, res,next)
}
function playerLocations(req, res, next) {
    service.playerLocations(req, res, next)
}
function sportLocations(req, res, next) {
    service.sportLocations(req, res, next)
}
function playerRating(req, res, next){
    service.playerRating(req, res, next)
}
function eventHours(req, res, next){
    service.eventHours(req, res, next)
}
function playerHours(req, res, next){
    service.playerHours(req, res, next)
}


module.exports = {
    listuser,
    userdetail,
    updateuser,
    deactiveuser,
    deleteuser,
    resetpassword,
    listsport,
    playerLocations,
    playerRating,
    eventHours,
    sportLocations,
    playerHours
}