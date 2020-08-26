import React from 'react';
import Async from 'react-async';
import { CircularProgress, Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const loadJson = () =>
  fetch("http://localhost:5000/api/Component/Owner/59bdbe5d1bd00316e834ae33")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

const App = () => (
  <Async promiseFn={loadJson}>
    {({ data, error, isLoading }) => {
      if (isLoading) return "Loading..."
      if (error) return `Something went wrong: ${error.message}`
      
      console.log("In AsyncFetch")
      
      if (data) 
        console.log(data)
        const columns = [
          {
            name: "assetnumber",
            label: "Asset#"
          }, 
          {
            name:"imte",
            label: "IMTE"
          }, 
          {
            name:"serialnumber",
            label: "Serial Number"
          },  
        ]
        const title = "Component";
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
       //return null
    }}
  </Async>
)

export default App;
/**
      
      
        const columns = [
          {
            name: "assetnumber",
            label: "Asset#"
          }, 
          {
            name:"imte",
            label: "IMTE"
          }, 
          {
            name:"serialnumber",
            label: "Serial Number"
          },  
          {
            name:"description",
            label: "Description"
          }, 
          {
            name:"owner",
            label: "Owner"
          },   
          {
            name:"model_Manufacturer",
            label: "Model/Manufacturer"
          }, 
          {
            name:"providerOfService",
            label: "Service Provider"
          },        
          {
            name:"calibrationDate",
            label: "Calibration Due Date"
          },
          {
            name:"maintenanceDate",
            label: "Maintenance Due Date"
          }
        ]
        const title = "Component";
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
      
 */