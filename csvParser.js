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
        reject(err);
      });
  });
};


module.exports = {csvToJson}