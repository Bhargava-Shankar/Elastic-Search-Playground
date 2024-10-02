const { Client } = require('@elastic/elasticsearch');
const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({
    node: process.env.ES_URL,
    auth: {
        username: process.env.ES_USERNAME,
        password: process.env.ES_PASSWORD
    }
 });


 module.exports = client;