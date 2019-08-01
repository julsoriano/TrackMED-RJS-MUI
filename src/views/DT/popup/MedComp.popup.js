import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import './popup/Bats';

export class MedComp extends Component {
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
		const row = data.map( (item,index) =>
			<tr key={ item.assetnumber }>
				<td>{ index + 1 }</td>
				<td>{ item.assetnumber }</td>
				<td>{ item.imte }</td>
				<td>{ item.serialnumber }</td>
				<td>{ item.description !== null ? item.description.desc : '' }</td> 
				<td>{ item.owner !== null ? item.owner.desc : '' }</td>
				<td>{ item.status !== null ? item.status.desc : '' }</td>
				<td>{ item.model_Manufacturer !== null ? item.model_Manufacturer.desc : '' }</td>
				<td>{ item.providerOfService !== null ? item.providerOfService.desc :'' }</td>                       
				<td>{ item.calibrationDate !== null ? ( new Date(item.calibrationDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
				<td>{ item.maintenanceDate !== null ? ( new Date(item.maintenanceDate).toLocaleDateString('en-GB', this.options) ) : '' }</td>
			</tr>
		);
		return (
			<tbody>{row}</tbody>
		)
	}
}

export default MedComp