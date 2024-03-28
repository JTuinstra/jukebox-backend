const {stringify} = require("querystring");
const axios = require("axios");
const userModel = require("../models/userModel");

const client_id = '680cce3dbdd64527a72e90d641d875f5'; // your clientId
const client_secret = '89bc9832e52f4f458f4cf24f384d52df'; // Your secret


module.exports = class GenericController {

    constructor() {
    }

    async getAccessToken(userId) {
        const params = stringify({
            grant_type: 'client_credentials'
        });

        const headers = {
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        };

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', params, {headers});

            userModel.findByIdAndUpdate(userId, {access_token: response.data.access_token}).then(() => {
                console.log('Token updated');
            });
        } catch (error) {
            console.error('Error getting access token', error);
        }
    }

}