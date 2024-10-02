// createIndex.js

const { Client } = require('@elastic/elasticsearch');

// Create a new client instance
const client = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: "elastic",
        password: "elastic"
    }
 });

const createIndex = async () => {
  try {
    const response = await client.indices.create({
      index: 'employees-uncleaned',
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
            City: { type: 'keyword' },
            ExitDate: {
              type: 'date',
              format: 'yyyy-MM-dd',
              null_value: null,
            }
          }
        }
      }
    });

    console.log('Index created:', response);
  } catch (error) {
    console.error('Error creating index:', error);
  }
};

const createCleanEmployeeIndex = async () => {
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

module.exports = client