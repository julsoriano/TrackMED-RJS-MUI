import React from 'react';
import Async from 'react-async';
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const loadJson = () =>
  fetch("http://localhost:5000/api/Owner")
  // fetch("https://api.coinmarketcap.com/v1/ticker/?limit=10")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

const App = () => (
  <Async promiseFn={loadJson}>
    {({ data, error, isLoading }) => {
      if (isLoading) return "Loading..."
      if (error) return `Something went wrong: ${error.message}`
      
      if (data) 
        console.log(data)
        const columns = ["id", "desc", "createdAtUtc"]
        const title = "Owners";
        const options = {
          filterType: "dropdown",
          responsive: "scroll"
        }
        return (
          <MUIDataTable title = 
          {<Typography variant="h4">
              {title}
              {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
          </Typography>
          } 
          columns={columns}
          data={data}
          options={options}
      />
        )
      
      // return null
    }}
  </Async>
)

export default App;