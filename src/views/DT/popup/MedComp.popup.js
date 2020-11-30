import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export class MedComp extends Component {
	/*
	static propTypes = {
		onTabClosed: PropTypes.func
	};
	*/
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