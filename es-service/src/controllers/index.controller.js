const client = require('../config/elasticSearchClient');
const  {csvToJson } = require("../config/indexProcess");

// First Function : Create collection
async function createCollection(p_collection_name) {
    console.log(client);
    try {
        const response = await client.indices.create({
            index: p_collection_name
        })
        return { "data": response };
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 2. Index the given employee data into the 
async function indexData(p_collection_name, p_exclude_column) {
    const csvFilePath = './data/cleanedEmployee.csv';
//   const indexExists = await client.indices.exists({ index: p_collection_name });
//     if (indexExists) {
//         console.log('Index already exists');
//         return;
//     }
    try {
        const data = await csvToJson(csvFilePath);
        const jsonData = JSON.parse(data)
        // Removed the index from from jsonData while indexing into the collection 
        const operations = jsonData.flatMap(doc => {
            const { [p_exclude_column]: excluded, ...filteredDoc } = doc;
            return [{ index: { _index: p_collection_name } }, filteredDoc]
        })
        const bulkResponse = await client.bulk({ refresh: true, operations })
        return { "data": bulkResponse };
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }   
}

// 3. Search By Column 
async function searchByColumn(p_collection_name, p_column_name, p_column_value){
    try {
        const data = await client.search({
            index: p_collection_name,
            data: {
                query: {
                    match: {
                        p_column_name : p_column_value
                    }
                }
            }
        })
        return { "data": data };
    }
    catch (err) {
        console.log("Error: ", err);
        throw err
    }
}

// 4. Get Employee Count - List of documents in the collection
async function getEmpCount(p_collection_name) {
    try {
        const data = await client.count({
            index: p_collection_name,
            body: {
                query: {
                    match_all: {}
                },
            },
        })
        return data;
    }
    catch (err) {
        console.error("Error: ", err)
        throw err;
    }
}

// 5. Delete Employee By Id
async function delEmpById(p_collection_name, p_employee_id) {
    try {
        const data = await client.deleteByQuery({
            index: p_collection_name,
            query: {
                match: {
                    "Employee ID" : p_employee_id
                }
            }
        })
        return data;
    }
    catch (err) {
        console.error("Error: ", err)
        throw err;
    }
}

async function getDeptFacet(p_collection_name) {
    try {
        const data = await client.search({
            index: p_collection_name,
            aggs: {
                employees_by_department: {
                    terms: {
                        field: "Department.keyword",
                        size : 10
                    }
                }
            }
        })
        return {"count" : data.took,"data" : data.aggregations.employees_by_department.buckets };
        
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}

module.exports = {createCollection,indexData,searchByColumn, getEmpCount, delEmpById, getDeptFacet}