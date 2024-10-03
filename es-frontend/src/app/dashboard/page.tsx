"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";
import { useTable, useFilters } from 'react-table';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collectionName, setCollectionName] = useState("employee"); // Default collection name
  const [columnName, setColumnName] = useState("");
  const [columnValue, setColumnValue] = useState("");

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      let url = `/api/search/${collectionName}`;
      if (columnName && columnValue) {
        url += `?pColumnName=${columnName}&pColumnValue=${columnValue}`;
      }
      const response = await axios.get(url);
      setData(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

    useEffect(() => {
      fetchData()
  },[])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Employee ID',
        accessor: (row: any) => row._source['Employee ID'],
      },
      {
        Header: 'Full Name',
        accessor: (row: any) => row._source['Full Name'],
      },
      {
        Header: 'Department',
        accessor: '_source.Department',
      },
      {
        Header: 'Job Title',
        accessor: '_source.Job Title',
      },
      {
        Header: 'Business Unit',
        accessor: '_source.Business Unit',
      },
      {
        Header: 'Gender',
        accessor: '_source.Gender',
      },
      {
        Header: 'Ethnicity',
        accessor: '_source.Ethnicity',
      },
      {
        Header: 'Age',
        accessor: '_source.Age',
      },
      {
        Header: 'Hire Date',
        accessor: '_source.Hire Date',
      },
      {
        Header: 'Annual Salary',
        accessor: '_source.Annual Salary',
      },
      {
        Header: 'Bonus %',
        accessor: '_source.Bonus %',
      },
      {
        Header: 'Country',
        accessor: '_source.Country',
      },
      {
        Header: 'City',
        accessor: '_source.City',
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useFilters);

  return (
    <div>
      <h1 className='text-3xl black font-bold m-5'>Employee Dashboard</h1>
        <div className='flex flex-row gap-5'>
        <div className="flex flex-row gap-5 items-center">
  <div className="flex flex-col ml-5">
    <label className="mb-1 text-gray-700">Collection Name:</label>
    <input
      type="text"
      value={collectionName}
      onChange={(e) => setCollectionName(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2"
    />
  </div>
  
  <div className="flex flex-col">
    <label className="mb-1 text-gray-700">Column Name:</label>
    <input
      type="text"
      value={columnName}
      onChange={(e) => setColumnName(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2"
    />
  </div>

  <div className="flex flex-col">
    <label className="mb-1 text-gray-700">Column Value:</label>
    <input
      type="text"
      value={columnValue}
      onChange={(e) => setColumnValue(e.target.value)}
      className="border border-gray-300 rounded px-3 py-2"
    />
                  </div>
                  <button className=' bg-green-700 font-bold text-white p-2 mt-6 items-end rounded-md' onClick={fetchData}>Search</button>   
                <CSVLink data={data.map((row) => row._source)} filename="data.csv" className=' bg-blue-700 font-bold text-white p-2 mt-6 items-end rounded-md' >
            Export to CSV
          </CSVLink>   
    </div>

    </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
         <div className="overflow-x-auto mt-5">
  <table {...getTableProps()} className="min-w-full table-auto border-collapse">
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
          {headerGroup.headers.map((column) => (
            <th
              {...column.getHeaderProps()}
              className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold"
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()} className="hover:bg-gray-50">
            {row.cells.map((cell) => (
              <td
                {...cell.getCellProps()}
                className="px-4 py-2 border border-gray-300"
              >
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;
