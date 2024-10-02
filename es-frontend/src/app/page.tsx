"use client"
import React, { useState, useRef } from 'react'
import { JsonInput, MantineThemeProvider } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import Image from 'next/image'

const placeholderValue = `{"match_all": {}}`

const Home = () => {
  const [userQuery, setUserQuery] = useState<string>("");
  const [userQueryResult, setUserQueryResult] = useState<string>("{}");
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    fetch("http://localhost:5000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.parse(userQuery))
    })
    .then((response) => response.json())
      .then((data) => {
      setUserQueryResult(JSON.stringify(data,null,2))
    })
    .catch((error) => console.error("Error:", error));
  }

  return (

    <div>
      <div className='flex flex-row justify-center items-center'>
        <Image src="https://syde.com/wp-content/uploads/sites/2/2018/12/elasticsearch6390.jpg" alt="logo" width={80} height={80} />
        <h1 className='text-4xl font-bold pb-5 pt-5'>Elastic Search Playground</h1>
      </div>
       <div className='flex flex-row '>
      <div className='border-2 border-grey-300 rounded-md p-0 w-1/2 overflow-y-auto h-[500px] '>
         
          <textarea className='w-full h-full font-mono focus:bg-gray-100 focus:text-black' name="userQuery" onChange={(e) => setUserQuery(e.target.value)}  />
       
              
      </div>
      <div className='border-2 border-grey-300 rounded-md p-0 w-1/2 overflow-y-auto h-[500px] text-sm text-gray-900 '>
        {
          <pre> {userQueryResult} </pre>
        }
      </div>
      </div>
      <div className='flex flex-row justify-center items-center'>
        <button className='bg-blue-500 text-white font-bold px-6 py-2 rounded-md mt-5' onClick={(e) => handleSubmit(e)}>Submit</button>
      </div>
    </div>
  )
}

export default Home