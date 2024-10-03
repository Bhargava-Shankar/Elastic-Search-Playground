
const express = require('express');
const router = express.Router();
const client = require('../config/elasticSearchClient');

const { createCollection,indexData,searchByColumn,getEmpCount,delEmpById, getDeptFacet } = require("../controllers/index.controller");

router.get('/search/:pCollectionName', async (req, res) => {

    const { pCollectionName } = req.params
    const { pColumnName, pColumnValue } = req.query;
    
    let query = { "match_all": {} };
    console.log(pCollectionName, pColumnName, pColumnValue);
    // Filtering process if seach query exists by column name and value
    if (pColumnName != undefined && pColumnValue != undefined) {
        query = {
            "match": {
                   [pColumnName] : pColumnValue
            }
        }
        console.log(query)
    }
    try {
        const response = await client.search({
            index: pCollectionName,
            body: {
                query: query
            },
            size: 1500
        })
        res.send({ "total" : response.hits.hits.length , "data": response.hits.hits });

    }
    catch (error) {
        console.error('Error:', error);
        res.send(error);
    }
});


router.post('/create-collection', async (req, res) => {
    const { pCollectionName } = req.body;
    try {
        const data = await createCollection(pCollectionName);
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
    
});

router.post('/index-data', async (req, res) => {
    const { pCollectionName, pExcludeColumn } = req.body;
    try {
        const data = await indexData(pCollectionName, pExcludeColumn);
        res.send(data);
    }
    catch (err) {
        res.send(err);
    }

})


router.get("/get-emp-count/:pCollectionName", async (req, res) => {
    const {pCollectionName}= req.params;
    try {
        const data = await getEmpCount(pCollectionName);
        res.send(data)
    }
    catch (err) {
        res.send(err)
    }
})

// Delete Employee by ID
router.delete("/:pCollectionName/:pEmployeeId", async (req, res) => {
    const { pCollectionName, pEmployeeId } = req.params;
    try {
        const data = await delEmpById(pCollectionName, pEmployeeId);
        res.send(data);
    }
    catch (err) {
          res.send(err)
    }
})

router.get("/dept-facet/:pCollectionName", async (req, res) => {
    const {pCollectionName}= req.params;
    try {
        const data = await getDeptFacet(pCollectionName)
        res.send(data);
    }
    catch (error) {
        res.send(error);
    }
})

module.exports = router;