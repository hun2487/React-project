import Grid from 'tui-grid';
import 'tui-grid/dist/tui-grid.css'


const data = [
    {mode: 'line', color: 'blue'},
  ];
  
const columns = [
    {name: 'mode', header: 'Mode'},
    {name: 'color', header: 'Color'},
  ];

const Table = () => (
  <Grid 
    data = {data}
    columns={columns}
    rowHeight={2}
    bodyHeight={10}
    rowHeaders={["rowNum"]}
    onEditingStart={()=>console.log("gdgd")}
    clientWidth={30}
  />
);

function A(){
  const data = [
    {mode: 'line', color: 'blue'},
  ];
  
  const columns = [
    {name: 'mode', header: 'Mode'},
    {name: 'color', header: 'Color'},

  ];

  return(
    <Grid 
    data = {data}
    columns={columns}
    //clientWidth={30}
    // rowHeight={2}
    // bodyHeight={10}
    // rowHeaders={["rowNum"]}
    // onEditingStart={()=>console.log("gdgd")}
  />
  )
};

export default A;
