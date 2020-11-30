import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

export class AsyncFetchPop extends Component {

	componentWillUnmount() {
		alert('componentWillUnmount');
	}

	_handleRef = (component) => {
		this.component = component;
	};

	render() {
		const {data} = this.props;
		// console.log(data);
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
		responsive: "scroll",
		// resizableColumns: true
		}
		return (
			<MUIDataTable title = 
			{<Typography variant="h4">
				{title}
			</Typography>
			} 
			columns={columns}
			data={data}
			options={options}
			/>
		)
	}
}

export default AsyncFetchPop