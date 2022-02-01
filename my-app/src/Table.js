import React, { useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const Table = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const getRowData = () => {
    const rowData = [];
    gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.log(rowData);
  };

  const clearData = () => {
    gridApi.setRowData([]);
  };

  const addItems = (addIndex) => {
    const newItems = [
      createNewRowData(),
      createNewRowData(),
      createNewRowData(),
    ];
    const res = gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
    printResult(res);
  };

  const updateItems = () => {
    const itemsToUpdate = [];
    gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    const res = gridApi.applyTransaction({ update: itemsToUpdate });
    printResult(res);
  };

  const onRemoveSelected = () => {
    const selectedData = gridApi.getSelectedRows();
    const res = gridApi.applyTransaction({ remove: selectedData });
    printResult(res);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '4px' }}>
          <button onClick={() => addItems()}>Add Items</button>
          <button onClick={() => addItems(2)}>Add Items addIndex=2</button>
          <button onClick={() => updateItems()}>Update Top 2</button>
          <button onClick={() => onRemoveSelected()}>Remove Selected</button>
          <button onClick={() => getRowData()}>Get Row Data</button>
          <button onClick={() => clearData()}>Clear Data</button>
        </div>
        <div style={{ flexGrow: '1' }}>
          <div
            id="myGrid"
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              rowData={[
                {
                  make: 'Toyota',
                  model: 'Celica',
                  price: 35000,
                  zombies: 'Elly',
                  style: 'Smooth',
                  clothes: 'Jeans',
                },
                {
                  make: 'Ford',
                  model: 'Mondeo',
                  price: 32000,
                  zombies: 'Shane',
                  style: 'Filthy',
                  clothes: 'Shorts',
                },
                {
                  make: 'Porsche',
                  model: 'Boxter',
                  price: 72000,
                  zombies: 'Jack',
                  style: 'Dirty',
                  clothes: 'Padded',
                },
              ]}
              defaultColDef={{ flex: 1 }}
              rowSelection={'multiple'}
              animateRows={true}
              onGridReady={onGridReady}
            >
              <AgGridColumn field="make" />
              <AgGridColumn field="model" />
              <AgGridColumn field="price" />
              <AgGridColumn field="zombies" />
              <AgGridColumn field="style" />
              <AgGridColumn field="clothes" />
            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

let newCount = 1;
function createNewRowData() {
  const newData = {
    make: 'Toyota ' + newCount,
    model: 'Celica ' + newCount,
    price: 35000 + newCount * 17,
    zombies: 'Headless',
    style: 'Little',
    clothes: 'Airbag',
  };
  newCount++;
  return newData;
}
function printResult(res) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log('Updated Row Node', rowNode);
    });
  }
}

export default Table;