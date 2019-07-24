import React, { Component } from 'react';
import axios from 'axios'
import './fna.css';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getCountry } from './dataService';
import { getColDefs } from './colDef';
import { Select, MenuItem, Modal } from '@material-ui/core';
import { NumericCellEditor } from './NumericCellEditor'
import { PopupEditor } from './popupEditor'
import { SwitchCoverage } from './switchCoverage'
import { GroupHeaders } from './groupHeaders'
import SelectReact from 'react-select';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';


class FnA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getCountry(),
      clientList: [],
      autoSgstValue: '',
      selected: 'IN',
      columnDefs: getColDefs(),
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      rowData: null,
      frameworkComponents: {    
        'numericCellEditor': NumericCellEditor,
        'switchCoverage': SwitchCoverage,
        'popupEditor': PopupEditor,
        'groupHeaders': GroupHeaders
      },
      icons: {
        columnGroupOpened: '<i class="far fa-plus-square groupHeaderIcon"/>',
        columnGroupClosed: '<i class="far fa-minus-square groupHeaderIcon"/>'
      },
      defaultColGroupDef: { headerClass: "groupHeaders" },
      openModal: false
    }
  }

  numberFormatter(params) {
    return "\xA3" + this.formatNumber(params.value);
  }
  numberParser(params) {
    return Number(params.newValue);
  }
  formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  handleChange = event => {
    this.setState({ selected: event.target.value, name: event.target.name });
  };

  renderOptions() {
    return this.state.data.map((dt, i) => {
      //console.log(dt);
      return (
        <MenuItem
          label="Select a country"
          value={dt.country_code}
          key={i} name={dt.country_name}>{dt.country_name}</MenuItem>

      );
    });
  }

  renderReactSelectOptions() {
    return this.state.data.map((dt, i) => {
      //console.log(dt);
      return (
          { label: dt.country_name.toUpperCase(), value: dt.country_code }
      )
    })
  }

  getDummyData = () => {
    // eslint-disable-next-line
    const columns = getColDefs()
    const newCols = [];
    newCols['children']=columns;
    let rowData = [];
    let columnData = [];
    for(let i=0; i< 10; i++){
      rowData.push(this.getcolumnData(newCols, columnData));
      columnData = [];
    }
    // rowData.push(this.getcolumnData(newCols, columnData));
    // columnData = [];
    // rowData.push(this.getcolumnData(newCols, columnData));
    return rowData;
  }

  getcolumnData = (column, data) => {
    if(column.children!==undefined && column.children.length>0){
      for(let i=0; i<column.children.length;i++) {
        data = this.getcolumnData(column.children[i], data);
      }
    }
    else if(column.field!==undefined) {
      if(column.field!=='ClientName' && column.field!=='SalesPersonName' && column.field!=='Comments' && column.field!=='Coverage')
        data[column.field] = Math.floor(Math.random()*(5000-1+1)+1);
      else if(column.field==='Coverage')
        data[column.field] =Math.floor(Math.random()*(5000-1+1)+1) > 2000;
      else
        data[column.field] ='Test Data';
    }
    return data;
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    // const updateColumnData = data => {
    //   this.setState({ columnDefs: data });
    // };

    const updateRowData = data => {
      this.setState({ rowData: data });
    };

    // https://api.myjson.com/bins/1d4gyz,  https://api.myjson.com/bins/e2dsb    -- Column Data
    // https://api.myjson.com/bins/ohc8r,   https://api.myjson.com/bins/163wdn     -- row data

    // axios.get('test.json')
    //   .then(res => {
    //     updateColumnData(res.data);
    //   })

    axios.get('https://api.myjson.com/bins/ohc8r')
      .then(res => {
        updateRowData(this.getDummyData());
        // updateRowData(res.data);
      })

    // const httpRequest = new XMLHttpRequest();
    // httpRequest.open(
    //   "GET",
    //   "https://api.myjson.com/bins/163wdn"
    // );
    // httpRequest.send();
    // httpRequest.onreadystatechange = () => {
    //   if (httpRequest.readyState === 4 && httpRequest.status === 200) {
    //     updateRowData(httpRequest.responseText);
    //   }
    // };

    // this below code is giving error
    // params.api.addGlobalListener(function(type, event) {
    //   if (type.indexOf("column") >= 0) {
    //     console.log("Got column event: ", event);
    //   }
    // });
  };

  handleModalOpen = () => {
    this.setState ({
      openModal: true
    });
  }
  handleModalClose = () => {
    this.setState ({
      openModal: false
    });
  }
  rand = () => {
    return Math.round(Math.random() * 20) - 10;
  }
  modalStyle = () => {
    const top = 50 + this.rand();
    const left = 50 + this.rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  renderModal = () => {
    return (
      <div>
        <button type="button" onClick={this.handleModalOpen}>
          Open Modal
        </button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.openModal}
          onClose={this.handleModalClose}
        >
          <div style={this.modalStyle} className="modalPaper">
            <h2 id="modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
          </div>
        </Modal>
      </div>
    )
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  // country_code
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : this.state.data.filter(item =>
      item.country_name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = suggestion => suggestion.country_code;

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      clientList: this.getSuggestions(value)
    });
  };

   // Autosuggest will call this function every time you need to clear suggestions.
   onSuggestionsClearRequested = () => {
    this.setState({
      clientList: []
    });
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.country_name, query);
    const parts = parse(suggestion.country_name, matches);
  
    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map(part => (
            <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
              {part.text}
            </span>
          ))}
        </div>
      </MenuItem>
    );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      autoSgstValue: newValue
    });
  };

  render() {
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value: this.state.autoSgstValue,
      onChange: this.onChange
    };
    return (
      <div className="App">
      {/* <h1> Welcome to FnA Portal </h1> */}
        { console.log(this.state.selected)}
        <div>
          {this.renderModal()}
        </div>
        <Select className="width50" value={this.state.selected} onChange={this.handleChange}>
          {this.renderOptions()}
        </Select>
        <h3>Selected Country - {this.state.selected}</h3>
        <SelectReact classNamePrefix="reactSelect" options={ this.renderReactSelectOptions() }
          TextFieldProps={{
            label: 'Country',
            InputLabelProps: {
              shrink: true,
            },
            placeholder: 'Search a country (start with a)',
          }}
          // defaultMenuIsOpen={true}
          // isLoading={true} 
          // menuPlacement="bottom"
        />
        
        <Autosuggest
          suggestions={this.state.clientList}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <div
          className="ag-theme-balham"
          style={{
            height: '600px',
            width: '1200px'
          }}
        >
          <AgGridReact
            defaultColDef={this.state.defaultColDef}
            columnDefs={this.state.columnDefs}
            floatingFilter={true}
            frameworkComponents = {this.state.frameworkComponents}
            // icons={this.state.icons}
            rowData={this.state.rowData}
            stopEditingWhenGridLosesFocus={true}
            onGridReady={this.onGridReady}>
          </AgGridReact>
        </div>
      </div>
    );
  }
}

export default FnA;
