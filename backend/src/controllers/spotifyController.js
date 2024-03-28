const axios = require('axios');
const GenericController = require("./genericController");
const userModel = require("../models/userModel");
let access_token = '';

const Controller = class spotifyController extends GenericController {

    constructor() {
        super();
        this.startSearch = this.startSearch.bind(this);
        this.searchAnything = this.searchAnything.bind(this);
    }

    async searchAnything(req, res) {
        const searchValue = req.query.searchValue;
        const searchOption = req.query.selectedOption.toLowerCase();
        const userId = req.query.userId;

        if (access_token === '') {
            access_token = await this.getAccessTokenFromDB(userId);
        }

        await this.startSearch(searchValue, searchOption, userId, res)
    }


    async startSearch(searchValue, searchOption, userId, res) {
        const headers = {
            'Authorization': 'Bearer ' + access_token, 'Content-Type': 'application/json'
        };

        try {
            const url = searchOption === 'all' ? `https://api.spotify.com/v1/search?q=${searchValue}&limit=20` : `https://api.spotify.com/v1/search?q=${searchValue}&type=${searchOption}&limit=20`;
            console.log(url)
            const response = await axios.get(url, {headers});
            console.log(response.data)

            res.status(200).json({data: response.data});

        } catch (error) {
            console.error(error)

            if (error.response.data.error.message.includes('token expired')) {
                await this.getAccessToken(userId);

                await this.startSearch(searchValue, searchOption, userId, res);

            } else {
                console.error('Error getting artist info', error);
                res.status(500).json({message: `Error getting ${searchOption} info`});
            }
        }
    }

    getAccessTokenFromDB(userId) {
        return userModel.findById(userId).then((user) => {
            return user.access_token;
        }).catch((error) => {
            console.error('Error getting access token', error);
        });
    }
}

module.exports = {
    Controller
}