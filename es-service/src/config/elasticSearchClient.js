const { Client } = require('@elastic/elasticsearch');

// Create a new client instance
const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: "elastic",
        password: "elastic"
    }
 });


 module.exports = client;