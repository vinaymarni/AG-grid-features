import React from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Table = () => {
    const columns =[
        {headerName:'ID', field:"id", checkboxSelection: true, headerCheckboxSelection: true },
        {headerName:'Name', field:"name"},
        {headerName:'Email', field:"email"},
        {headerName:'Body', field:"body", hide: true},
    ]

    const defaultColDef={
        sortable: true, editable: true, filter: true, floatingFilter: true, flex : 1, tooltipField:"name"
    }
    let gridApi = ""
    const onGridReady = (params) =>{
        gridApi = params
        fetch("https://jsonplaceholder.typicode.com/comments").then((resp) => resp.json())
        .then((resp)=> {console.log(resp)
            params.api.applyTransaction({add:resp})
            //params.api.paginationGoToPage(10)
        })
    }

    const onPaginationChange = (pageSize) => {
        gridApi.api.paginationGoToPage(pageSize)
    }

    const rowSelectionType = "multiple" 

    const onSelectionChanged = (event) =>{
        console.log(event.api.getSelectedRows())
    }

   

    return(
    <div style={{margin: "20px"}}>
            <h3>Student Details</h3>
           
            <select onChange={(e) => onPaginationChange(e.target.value) }>
                <option value = "0">0</option>
                <option value = "10">10</option>
                <option value = "20">20</option>
                <option value = "30">30</option>
                <option value = "40">40</option>
                <option value = "50">50</option>
            </select>
            <div id="myGrid" className='ag-theme-alpine' style={{height:"350px"}} >
                <AgGridReact 
                    columnDefs={columns} 
                    defaultColDef={defaultColDef} 
                    onGridReady={onGridReady} 
                    enableBrowserTooltips={true}
                    tooltipShowDelay = {{tooltipShowDelay:2}}
                    rowSelection={rowSelectionType}
                    onSelectionChanged = {onSelectionChanged}
                    rowMultiSelectWithClick ={true}
                    pagination = {true}
                    paginationPageSize = {10}
                    //paginationAutoPageSize = {true}
                >
                </AgGridReact>
            </div>
        </div>
    )
}