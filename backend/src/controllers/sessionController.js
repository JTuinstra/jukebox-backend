const userModel = require('../models/userModel');
const {json} = require("express");

const Controller = class sessionController {

    constructor() {
    }

    logout(req, res) {
        const userId = JSON.parse(req.body.user).user._id

        req.session.destroy(async (err) => {
            if (err) {
                res.status(400).json({type: "error", message: "Error logging out", fullMessage: err});
            } else {
                res.status(200).json({type: "success", message: "Logged out successfully"});
                await userModel.findByIdAndUpdate({_id: userId}, {isLoggedIn: false})
            }
        });
    }
}

module.exports = {
    Controller
}