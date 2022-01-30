import React from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Table = () => {
    const actionButton = (params) =>{
        console.log(params)
    }
    const data = [
        {name : "Vinay", age:24 , salery: 300000 },
        {name : "Bhavani", age:23, salery: 350000 },
        {name : "Achyuth", age:24, salery: 360000 },
        {name : "Sanjey", age:25, salery: 370000 },
        {name : "Sai", age:26, salery: 380000 }
    ]
    const columns =[
        {headerName:'Name', field:"name"},
        {headerName:'Age', field:"age"},
        {headerName:'Salery', field:"salery"},
        {headerName:'Action',
        cellRendererFramework:(params) => 
        <div>
            <button onClick={actionButton(params)}>Click me</button>
        </div> },
    ]

    const defaultColDef={
        sortable: true, editable: true, filter: true, floatingFilter: true, flex:1
    }

    
    return(
        <div>
            <div id="myGrid" className='ag-theme-alpine' style={{height:"250px", width:"600px"}} >
                <AgGridReact 
                rowData = {data} 
                columnDefs={columns} 
                defaultColDef={defaultColDef} 
                />
            </div>
        </div>
    )
}