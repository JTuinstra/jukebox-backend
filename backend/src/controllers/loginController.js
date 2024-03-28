const userModel = require('../models/userModel');
const {hashSync, compareSync} = require("bcrypt");
const GenericController = require("./genericController");

const Controller = class LoginController extends GenericController {

    constructor() {
        super();
    }

    verifyCredentials(req, res) {

        userModel.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}).then((data) => {
            if (data === null) {
                res.status(404).json({type: "error", message: "User not found"});

            } else {

                if (compareSync(req.body.password, data.password)) {
                    userModel.findByIdAndUpdate(data._id, {isLoggedIn: new Date()}).then((data) => {
                    });
                    data.password = undefined;
                    data.access_token = undefined;
                    data.username = data.username.charAt(0).toUpperCase() + data.username.slice(1);

                    super.getAccessToken(data._id).then(() => {
                        res.status(200).json({
                            type: "success", message: "Credentials verified", data: data
                        });
                    });

                } else {
                    res.status(401).json({type: "error", message: "Invalid credentials"});
                }
            }
        }).catch((err) => {
            console.error(err);
            res.status(400).json({type: "error", message: "Error verifying credentials", fullMessage: err});
        });
    }

    async createUser(req, res) {
        if (await userModel.findOne({$or: [{username: req.body.username}, {email: req.body.email}]})) {
            res.status(400).json({type: "error", message: "Username or email already exists"});
            return;
        }

        req.body.password = hashSync(req.body.password, 10);

        await userModel.create(req.body).then((data) => {
            console.log(data);
            res.status(201).json({type: "success", message: "User created successfully!"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({type: "error", message: "Error creating user", fullMessage: err});
        });
    }

}

module.exports = {
    Controller
}