const { csvToJson } = require('./csvParser');
const client  = require("./create-index");

(async () => {
    const csvFilePath = 'cleanedEmployee.csv';
    try {
        const data = await csvToJson(csvFilePath);
        const jsonData = JSON.parse(data)
        const operations = jsonData.flatMap(doc => [{ index: { _index: 'employees-cleaned' } }, doc])
        const bulkResponse = await client.bulk({ refresh: true, operations })
    }
    catch (error) {
        console.error('Error:', error);
    }   
})()

