const client = require('./elasticSearchClient');
const fs = require('fs');
const csv = require('csv-parser');


const csvToJson = async (csvFilePath) => {
  const results = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(JSON.stringify(results, null, 2)); 
      })
        .on('error', (err) => {
          console.error('Error:', err);
        reject(err);
      });
  });
};


const createCleanEmployeeIndex = async () => {
    const indexExists = await client.indices.exists({ index: 'employees-cleaned' });
    if (indexExists) {
        console.log('Index already exists');
        return;
    }
  try {
    const response = await client.indices.create({
      index: 'employees-cleaned',
      body: {
        mappings: {
          properties: {
            EmployeeID: { type: 'integer' },
            FullName: { type: 'text' },
            JobTitle: { type: 'text' },
            Department: { type: 'text' },
            BusinessUnit: { type: 'text' },
            Gender: { type: 'keyword' },
            Ethnicity: { type: 'keyword' },
            Age: { type: 'integer' },
            HireDate: { type: 'date', format: 'yyyy-MM-dd' },
            AnnualSalary: { type: 'float' },
            BonusPercentage: { type: 'float' },
            Country: { type: 'keyword' },
            City: { type: 'keyword' }
          }
        }
      }
    });

    console.log('Index created:', response);
  } catch (error) {
    console.error('Error creating index:', error);
  }
};

const dataLoader = async () => {
  const csvFilePath = './data/cleanedEmployee.csv';
  const indexExists = await client.indices.exists({ index: 'employees-cleaned' });
    if (indexExists) {
        console.log('Index already exists');
        return;
    }
    try {
        const data = await csvToJson(csvFilePath);
        const jsonData = JSON.parse(data)
        const operations = jsonData.flatMap(doc => [{ index: { _index: 'employees-cleaned' } }, doc])
        const bulkResponse = await client.bulk({ refresh: true, operations })
        console.log('Data loaded:', bulkResponse);
    }
    catch (error) {
        console.error('Error:', error);
    }   
}

module.exports = { createCleanEmployeeIndex, dataLoader, csvToJson };

