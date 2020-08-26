import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
// import PropTypes from 'prop-types';
// import './popup/Bats';

export class AsyncFetchPop extends Component {
	/*
	constructor(props) {
		super(props);

		// uncomment for testing
		// this.state = { data: [] };
	}
	
	static propTypes = {
		onTabClosed: PropTypes.func
	};
	*/
	
	componentDidMount() {
		console.log("Dito ako");
		/* uncomment for testing
		fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
		.then(res => res.json())
		.then(json => this.setState({ data: json }));
		*/
	}

	componentWillUnmount() {
		alert('componentWillUnmount');
	}

	_handleRef = (component) => {
		this.component = component;
	};

	/* uncomment for testing
	render() {
		alert('render in /src/Batas.js');
		return (
			<x-bats ref={this._handleRef}>
				<ul>
					{this.state.data.map(el => (
						<li>
						{el.name}: {el.price_usd}
						</li>
					))}
				</ul>
			</x-bats>
		);
	}	
	*/

	render() {
		const {data} = this.props;
		console.log(data);
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