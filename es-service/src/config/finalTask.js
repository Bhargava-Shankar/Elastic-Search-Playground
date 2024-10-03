const fs = require('fs');
const { createCleanEmployeeIndex, dataLoader } = require('./indexProcess');
const client = require('./elasticSearchClient');


dataLoader();