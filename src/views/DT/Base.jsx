import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './Base.css';
import { isNullOrUndefined } from 'util';

import MedComp from './popup/MedComp.popup';
import MedSystem from './popup/MedSystem.popup';

// import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

export class Base extends Component {
    // Table cloned from TrackMED-RJS-VS
    renderCommonTable(descriptions) { 
        return <table className='table-striped table-condensed table-hover' cellSpacing='0' width='100%'>
            <thead>
                <tr role='row'>
                    <th></th>
                    <th>Index</th>
                    <th>Description</th>
                    <th>Created Date</th>
                </tr>
            </thead>
            <tbody>
            {descriptions.map( (description, index) =>
                <tr key={ index + 1 }>
                    <td data-id={ description.id } className='glyphicon glyphicon-plus' 
                        onClick={this.showRelatedTable}></td>
                    <td>{ index + 1 }</td>
                    <td>{ description.desc }</td>
                    <td>{ new Date(description.createdAtUtc).toLocaleDateString('en-GB', this.options) }</td>
                </tr>
            )}
            </tbody>
        </table>;
    }

    itemUrl = 'http://localhost:5000/';
    title;
    tableName = null;
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    tr;
    elListSave;
    /*
      React components can have state by setting this.state in the constructor, which should be considered private to the component.
      Let's store the current value of the descriptions table in state, and change it when another table is clicked.
  
      First, add a constructor to the class to initialize the state:
    */   
    constructor(props) {
  
        // In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass. 
        // See https://reactjs.org/tutorial/tutorial.html
        super(props);  
      
        // This binding is necessary to make `this` work in the callback
        this.showRelatedTable = this.showRelatedTable.bind(this);

        this.state = { 
            descriptions: [], 
            medComponents: [],
            medSystems: [],            
            loading: true };
    }
  
    popupComponentTable(root) {
        // alert(Array.isArray(this.state.medComponents) ? "medComponents is an Array" : "medComponents is not an Array");
        ReactDOM.render(  
        <td colSpan = '4'>
            <table className='table table-light table-striped'>
				<thead>
					<tr>
						<th>Index</th>
						<th>Asset#</th>
						<th>IMTE</th>
						<th>Serial Number</th>
						<th>Description</th>
						<th>Owner</th>
						<th>Status</th>
						<th>Model/Manufacturer</th>
						<th>Service Provider</th>
						<th>Calibration Due Date</th>
						<th>Maintenance Due Date</th>                   
					</tr>
				</thead> 
                    <MedComp data = { this.state.medComponents } />
            </table>
        </td>, root);
    }

    popupSystemTable(root) {
        // alert(Array.isArray(this.state.medSystems) ? "medSystems is an Array" : "medSystems is not an Array");
        ReactDOM.render(  
        <td colSpan = '4'>
            <table className='table table-light table-striped'>
				<thead>
                    <tr role="row">
                        <th>Index</th>
                        <th>IMTE</th>
                        <th>Reference No.</th>
                        <th>System Description</th>
                        <th>Deployment Date</th>
                        <th>Location</th>                   
                    </tr>
				</thead> 
                    <MedSystem data = { this.state.medSystems } />
            </table>
        </td>, root);
    }
    
    // Function to compare two objects by comparing their `desc` property.const
    // From: https://stackoverflow.com/questions/42203953/angular2-rxjs-order-observable-list-of-objects-by-an-observable-field 
    compareFn = (a, b) => {
      if (a.desc < b.desc) { return -1;}
      if (a.desc > b.desc) { return 1; }
      return 0;
    }; 
    
    /*
    async function fetchAsync () {
        // await response of fetch call
        let response = await fetch('https://api.github.com');
        // only proceed once promise is resolved
        let data = await response.json();
        // only proceed once second promise is resolved
        return data;
    };
    */

    getItems(itemApi) {
      
      this.tableName = /^api\/(.+$)/.exec(itemApi);
      this.title = this.tableName[1];

      fetch(this.itemUrl + itemApi)
        .then(response => response.json())
        .then(data => {
            this.setState({ descriptions: data, loading: false });
      });
    }
   
    headings = {
        'assetnumber' : 'Asset#',
        'imte' : 'IMTE',
        'serialnumber' : 'Serial Number',
        'description' : 'Description',
        'owner' : 'Owner',
        'status' : 'Status',
        'model_Manufacturer' : 'Model/Manufacturer',
        'providerOfService' : 'Service Provider',
        'calibrationDate' : 'Calibration Due Date',
        'maintenanceDate' : 'Maintenance Due Date'
    }    
     
    // Dynamically compose nested table: Using Plain HTML Elements
    createNTableHTML(id, elGP, elP, headings) {

        let urlComplete = this.itemUrl + 'api/Component/' + this.tableName[1] + '/' + id;

        fetch(urlComplete)
        .then(response => response.json()) 
        .then(data => {
            // console.log("Number of Components = " + Object.keys(data).length);
            // console.log(data);

            // create a <table> element
            this.tr = document.createElement("tr");
            this.tr.setAttribute("id", "NestedTR");
            
            var td = document.createElement("td");
            td.setAttribute("colspan", "5");
            
            var tbl = document.createElement("table");
            tbl.classList.add('table', 'table-light', 'table-striped', 'table-condensed');

            // create a <thead> element and its child nodes (<tr> and <th>)
            var tblHead = document.createElement("thead");
            var rowH = document.createElement("tr");

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
            const fieldNames = Object.getOwnPropertyNames(headings);

            var cell = document.createElement("th");
            // cell.style.color = "blue";

            // this will be placed on the 1st column by default
            var cellText = document.createTextNode("Index");
            cell.appendChild(cellText);
            rowH.appendChild(cell);

            for (var fn of fieldNames) {
                // e.g., if property name = 'assetnumber', then celltext = 'Asset#'
                var hdg = headings[fn];
                if (hdg != null) {
                    cell = document.createElement("th");
                    // cell.style.color = "blue";
                    cellText = document.createTextNode(hdg);
                    cell.appendChild(cellText);
                    rowH.appendChild(cell);
                }            
            }
            
            // attach headings to parent nodes
            tblHead.appendChild(rowH);
            tbl.appendChild(tblHead);
    
            // create a <tbody> element and its child nodes (<tr> and <td>)
            var tblBody = document.createElement("tbody");
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let idx = 0;

            for (var x of data) {

                ++idx;
                var row = document.createElement("tr"); 
                cell = document.createElement("td");

                // this will be placed on the 1st column by default
                cellText = document.createTextNode(idx.toString());
                cell.appendChild(cellText);
                row.appendChild(cell);
                
                // https://stackoverflow.com/questions/37673454/javascript-iterate-key-value-from-json/37673499                
                // eslint-disable-next-line
                Object.keys(headings).forEach(function(key) {
                
                    cell = document.createElement("td");
                    // cell.style.color = "red";
                    if( headings[key] === 'Description' || 
                        headings[key] === 'Owner' ||
                        headings[key] === 'Status' ||
                        headings[key] === 'Model/Manufacturer' ||
                        headings[key] === 'Service Provider' ) {
                        
                        // this will be placed on the next column in sequence
                        cellText = x[key] !== null ? document.createTextNode(x[key].desc) : document.createTextNode('');

                    } else if( headings[key] === 'Calibration Due Date' || 
                            headings[key] === 'Maintenance Due Date')  {

                                // this will be placed on the next column in sequence
                                cellText = x[key] !== null ? document.createTextNode(new Date(x[key]).toLocaleDateString('en-GB', options)) : document.createTextNode('');
                                   
                    } else {
                        // this will be placed on the next column in sequence
                        cellText = document.createTextNode(x[key]);
                    }

                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }) 
               
                // add the row to the end of the table body
                tblBody.appendChild(row);
            }
            
            // put the <tbody> in the <table>
            tbl.appendChild(tblBody);
            td.appendChild(tbl);
            this.tr.appendChild(td);

            elGP.insertBefore(this.tr, elP.nextSibling); 
 
            // Uncomment for testing
            // let span = document.createElement("span");
            // span.appendChild(document.createTextNode("No records to display"));
            // div.appendChild(span);
        
        });
    };
    
    // Dynamically compose nested table: Using Custom HTML Elements
    createNTableComponent(id, elGP, elP) {
        // create a <table> row element
        this.tr = document.createElement("tr");
        this.tr.setAttribute("id", "NestedTR");
        
        let apiTbl = 'api/Component';    
        this.title === 'Location' ? apiTbl = 'api/SystemTab/' : apiTbl = 'api/Component/';
        let urlComplete = this.itemUrl + apiTbl + this.title + '/' + id;
        // alert(urlComplete);
        fetch(urlComplete)
        .then(response => response.json()) 
        .then(data => {
            
            // this.setState({ title: this.title, id: this.id });
 
            if( this.title === 'Description' || 
                this.title === 'Owner' ||
                this.title === 'Status' ||
                this.title === 'Model/Manufacturer' ||
                this.title === 'Service Provider' ) {             

                this.setState({ medComponents: data, loading: false });
                this.popupComponentTable(this.tr); 
        
            } else if( this.title === 'Location') {

                this.setState({ medSystems: data, loading: false });
                this.popupSystemTable(this.tr); 
            }  
            
            elGP.insertBefore(this.tr, elP.nextSibling);  
        });         
    };
    
    showRelatedTable(event) {
        event.preventDefault();

        let id = event.target.dataset.id;
        let elP = event.target.parentNode; // Parent Node: tr
        let elGP = elP.parentNode;         // Parent Node: tbody
        let elList = event.target.classList;

        /* Uncomment for testing only
        let div = document.createElement('div');
        let span = document.createElement('p');
        span.innerHTML = 'No Records to Display';
        div.appendChild(span);
        */
        
        if (elList.contains('glyphicon-plus')) {
            
            elList.replace('glyphicon-plus', 'glyphicon-minus');
            
            if( !isNullOrUndefined(this.tr)) this.tr.parentNode.removeChild(this.tr);
            if( !isNullOrUndefined(this.elListSave)) this.elListSave.replace('glyphicon-minus', 'glyphicon-plus');

            // create nested table using regular HTML elements
            // this.createNTableHTML(id, elGP, elP, this.headings);     
            
            // create nested table using custom HTML elements
            this.createNTableComponent(id, elGP, elP);

            this.elListSave = elList;

        } else {
            elList.replace('glyphicon-minus', 'glyphicon-plus');
            this.tr.parentNode.removeChild(this.tr); // https://www.w3schools.com/js/js_htmldom_nodes.asp
            this.tr = null;
        }
    }
       
    render() {
        const contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCommonTable(this.state.descriptions.sort(this.compareFn));
        
        return <div>

            { contents }
        </div>;
    }  
  }
