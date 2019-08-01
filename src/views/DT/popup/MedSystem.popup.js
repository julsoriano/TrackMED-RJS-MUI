import React, { Component } from 'react';

export class MedSystem extends Component {
	/*
	constructor(props) {
		super(props);
	}
	
	*/
	componentDidMount() {

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

	render() {
		const {data} = this.props;
		const row = data.map( (item,index) =>
			<tr key={ item.assetnumber }>
				<td>{ index + 1 }</td>
				<td>{ item.imte }</td>
				<td>{ item.referenceNo }</td>
				<td>{ item.systemsDescription !== null ? item.systemsDescription.desc : ''  }</td> 
				<td>{ item.deploymentDate !== null ? ( new Date(item.deploymentDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
				<td>{ item.location !== null ? (item.location.desc) : ''  }</td>
			</tr>
		);
		return (
			<tbody>{row}</tbody>
		)
	}
}

export default MedSystem