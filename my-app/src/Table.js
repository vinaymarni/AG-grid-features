import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import 'ag-grid-enterprise';
import axios from 'axios';

const Table = () => {
    const [data, setdata] = useState(null);
    const [gridColumnApi , setGridColumnApi] = useState(null)
    const [hideColumn , setHideColumn] = useState(false)
    const onGridReady = (params) => {
        setdata(params.api)
        axios.get('https://www.ag-grid.com/example-assets/row-data.json')
        .then(res => res.data).then(res => {
            params.api.applyTransaction({add:res})
        })
        setGridColumnApi(params.columnApi)
    };

    const columns = [
        {headerName : "Make" , field : 'make' , checkboxSelection : true , headerCheckboxSelection : true} ,
        {headerName : "Model" , field : 'model' , tooltipField : 'make'} ,
        {headerName : "Price" , field : 'price' , cellStyle:((params) => (params.value > 50000 ? {color : 'green'} : {color : 'red'}))}
    ]
    const defaultColDefs = {sortable : true , editable : true , filter : true , floatingFilter : true , flex: 1 }
   
    const onSelectionChanged = (event) => {
        console.log(event.api.getSelectedRows())
    }
    const onPageChange = (pageNum) => {
        data.paginationSetPageSize(pageNum)
    }

    let buttonText = "Hide"
    hideColumn ? buttonText = "Show" : buttonText = "Hide"
    
    const showColumn = () => {
        gridColumnApi.setColumnsVisible(['model'] , hideColumn)
        setHideColumn(!hideColumn)
        data.sizeColumnsToFit()
        
    }
    const onTextChange = (e) => {
        data.setQuickFilter(e.target.value)
    } 
    return(
      <div ag-grid="gridOptions" className='ag-theme-alpine' style={{height : '95vh' , width : '95vw', marginLeft: "10px"}}>
        <div style={{ backgroundColor: '#919291', padding : "10px"}}>
         <select onChange={(e) => onPageChange(e.target.value)} style={{width : '100px' , height : '25px', borderRadius: "15PX", paddingLeft: "7px", paddingRight: "7px"}}>
              <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='75'>75</option>
              <option value='100'>100</option>
          </select>
          <button style = {{width : '100px' , height : '25px' , marginLeft : '10px' , backgroundColor : 'white' , borderWidth : '1px', borderRadius: "15PX"}} onClick={showColumn}>{buttonText}</button>
          <input type = 'search' onChange={(e) => onTextChange(e)} style = {{width : '350px' , height : '25px' , marginLeft : '10px' , borderWidth : '1px', borderRadius: "15PX", padding: "7px"}} placeholder='Search Here..' />
        </div>
        <AgGridReact
          columnDefs = {columns}
          defaultColDef = {defaultColDefs}
          pagination = {true}
          enableBrowserTooltips = {true}
          onGridReady = {onGridReady}
          rowSelection = 'multiple'
          onSelectionChanged = {onSelectionChanged}
          />
      </div>
  )
}

export default Table