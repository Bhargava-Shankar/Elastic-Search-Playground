
const express = require('express');
const router = express.Router();
const client = require('../config/elasticSearchClient');

router.get('/search', async (req, res) => {

    const query = req.body;
    console.log(query);
    try {
        const response = await client.search({
            index: 'employees-cleaned',
            body: {
                query: query
            }
        })
        console.log(response);
        res.send({ "data": response.hits.hits });

    }
    catch (error) {
        console.error('Error:', error);
        res.send(error);
    }
});


module.exports = router;