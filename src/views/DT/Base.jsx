import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import './Base.css';

import MedComp from './popup/MedComp.popup';
import MedSystem from './popup/MedSystem.popup';
import AsyncFetchPop from './popup/AsyncFetch.popup';
import ConfirmDialog from './popup/ConfirmDialog.jsx';

import Icon from "@material-ui/core/Icon";

import SimpleDialog from '../../components/Dialog/SimpleDialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import SvgIcon from '@material-ui/core/SvgIcon';
// import { SvgIcon } from '@material-ui/core';

// import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

export class Base extends Component {
     
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
                    <td><Icon onClick={this.onSelect}>update</Icon></td>
                    <td><Icon onClick={this.setConfirmOpen}>deleteforever</Icon>
                    </td>
                </tr>
            )}
            </tbody>
        </table>;
    }
    /**
     *                     
                    
                        <ConfirmDialog
                            title="Delete Record?"
                            open={this.confirmOpen}
                            setOpen = {this.confirmOpen}
                            onConfirm={this.deletePost}
                        >
                            Are you sure you want to delete this record?
                        </ConfirmDialog>                
     */
    /*
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    */

    itemUrl = 'http://localhost:5000/';
    title;
    tableName = null;
    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    tr;
    elListSave;

    confirmOpen = false;
    deletePost = false;

    constructor() {
  
        // In JavaScript classes, you need to explicitly call super(); when defining the constructor of a subclass. 
        // See https://reactjs.org/tutorial/tutorial.html
        super();  
      
        // This binding is necessary to make `this` work in the callback
        this.showRelatedTable = this.showRelatedTable.bind(this);
        this.onSelect = this.onSelect.bind(this);
        //this.onDelete = this.onDelete.bind(this);
        this.setConfirmOpen = this.setConfirmOpen.bind(this);

        this.state = { 
            descriptions: [], 
            medComponents: [],
            medSystems: [], 
            dtComponents: [],    
            dtSystems: [],         
            loading: true };
    }
  
    popupComponentTable(root) {
        ReactDOM.render(  
        <td colSpan = '5'>
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
        ReactDOM.render(  
        <td colSpan = '5'>
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

    popupComponentDT(root) {
        ReactDOM.render( 
        <td colSpan = '5'> 
            <AsyncFetchPop data = { this.state.dtComponents } />
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
            console.log(data);
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
 
    createDataTable(id, elGP, elP){
        // create a <table> row element
        this.tr = document.createElement("tr");
        this.tr.setAttribute("id", "NestedTR");
        
        let apiTbl = 'api/Component';    
        this.title === 'Location' ? apiTbl = 'api/SystemTab/' : apiTbl = 'api/Component/';
        let urlComplete = this.itemUrl + apiTbl + this.title + '/' + id;
        
        fetch(urlComplete)
        .then(response => response.json()) 
        .then(data => {
 
            if( this.title === 'Description' || 
                this.title === 'Owner' ||
                this.title === 'Status' ||
                this.title === 'Model/Manufacturer' ||
                this.title === 'Service Provider' ) {             

                this.setState({ dtComponents: data, loading: false });
                this.popupComponentDT(this.tr); 
        
            } else if( this.title === 'Location') {

                this.setState({ dtSystems: data, loading: false });
                this.popupSystemTable(this.tr); 
            }  
            
            elGP.insertBefore(this.tr, elP.nextSibling);  
        });         
         
        
        /*
        const loadJson = () =>
            // fetch("http://localhost:5000/api/Component/?limit=10")
            // fetch("http://localhost:5000/api/Component/Owner/59bdbe5d1bd00316e834ae33")
            // fetch("https://api.coinmarketcap.com/v1/ticker/?limit=10")
            fetch(urlComplete)
                .then(res => (res.ok ? res : Promise.reject(res)))
                .then(res => res.json())

        //const App = () => (
        // ReactDOM.render(
        return (
            <Async promiseFn={loadJson}>
            {({ data, error, isLoading }) => {
              if (isLoading) return "Loading..."
              if (error) return `Something went wrong: ${error.message}`
              
              console.log("In AsyncFetch")
              
              if (data) {
                console.log(data)
                this.setState({ dtComponents: data, loading: false });
                this.popupComponentDT(this.tr);
              } 
            }}
          </Async>
        )
        */
    }

    // Dynamically compose nested table: Using Plain HTML Elements
    createNTableHTML(id, elGP, elP, headings) {
        
        let urlComplete = this.itemUrl + 'api/Component/' + this.tableName[1] + '/' + id;

        fetch(urlComplete)
        .then(response => response.json()) 
        .then(data => {
            console.log("Number of Components = " + Object.keys(data).length);
            console.log(data);

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
        
        fetch(urlComplete)
        .then(response => response.json()) 
        .then(data => {
            console.log(urlComplete);
            console.log(data);
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
        console.log(id);

        /* Uncomment for testing only
        let div = document.createElement('div');
        let span = document.createElement('p');
        span.innerHTML = 'No Records to Display';
        div.appendChild(span);
        */
        
        if (elList.contains('glyphicon-plus')) {
            
            elList.replace('glyphicon-plus', 'glyphicon-minus');
            
            if( this.tr !== null && this.tr !== undefined) this.tr.parentNode.removeChild(this.tr);
            if( this.elListSave !== null && this.elListSave !== undefined ) this.elListSave.replace('glyphicon-minus', 'glyphicon-plus');

            // create nested table using regular HTML elements
            // this.createNTableHTML(id, elGP, elP, this.headings);     
            
            // create nested table using custom HTML elements
            // this.createNTableComponent(id, elGP, elP);

            this.createDataTable(id, elGP, elP);

            this.elListSave = elList;

        } else {
            elList.replace('glyphicon-minus', 'glyphicon-plus');
            this.tr.parentNode.removeChild(this.tr); // https://www.w3schools.com/js/js_htmldom_nodes.asp
            this.tr = null;
        }
    }

    setConfirmOpen(event) 
    {
        
        return (
            <ConfirmDialog
                title="Delete Record?"
                open={this.confirmOpen}
                setOpen = {this.confirmOpen}
                onConfirm={this.deletePost}
            >
                Are you sure you want to delete this record?
            </ConfirmDialog>
        ) 
        /* 
        const emails = ['username@gmail.com', 'user02@gmail.com']; 
        // const [open, setOpen] = React.useState(false);
        const open = false;
        const setOpen = false;
        // const [selectedValue, setSelectedValue] = React.useState(emails[1]);
        const selectedValue = emails[1];
        const setSelectedValue = emails[1];

        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = (value) => {
          setOpen(false);
          setSelectedValue(value);
        };
        
        alert("in setConfirmOpen");
        
        return (
          <div>
            <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Open simple dialog
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
          </div>
        );    
        */
    };
   
    onSelect(item) {
        if (this.svSelected === item) {
        this.selectedItem = null;
        this.editText = "Edit";
        }
        else {
        this.selectedItem = item;
        this.svSelected = item;
        this.editText = "Cancel Edit";
        }
    }

    onDelete(item, index) {
        // https://stackoverflow.com/questions/43962481/angular-2-get-element-data-and-remove-it
        if(window.confirm('Please confirm deletion of row')) {
        // this.delete(this.selectedItem, this.itemUrl);    // physically delete record: not working yet
        this.items.splice(index, 1);          // remove row from array items
        } else {
        return false;
        }
    }

    delete(item, itemUrl) {
        // alert('id:' + item.id + ' name: ' + item.desc);
        this.appService.deleteItem(item, itemUrl).subscribe();
    }
       
    render() {
        const contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCommonTable(this.state.descriptions.sort(this.compareFn));
        console.log( {contents} );
        return <div>
            { contents }
        </div>;
    }  
  }
