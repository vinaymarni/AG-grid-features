import React from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Table = () => {
    
   
    const columns =[
        {headerName:'ID', field:"id"},
        {headerName:'Name', field:"name"},
        {headerName:'Email', field:"email"},
        
    ]

    const defaultColDef={
        sortable: true, editable: true, filter: true, floatingFilter: true, flex:1, tooltipField:"name"
    }

    const onGridReady = (params) =>{
        fetch("https://jsonplaceholder.typicode.com/comments").then((resp) => resp.json())
        .then((resp)=> {console.log(resp)
            params.api.applyTransaction({add:resp})})
    }

    return(
        <div>
            <div id="myGrid" className='ag-theme-alpine' style={{height:"250px", width:"600px"}} >
                <AgGridReact 
               
                columnDefs={columns} 
                defaultColDef={defaultColDef} 
                onGridReady={onGridReady} 
                enableBrowserTooltips={true}
                tooltipShowDelay = {{tooltipShowDelay:2}}
                />
            </div>
        </div>
    )
}