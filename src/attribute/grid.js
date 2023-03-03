import Grid from '@toast-ui/react-grid'
import 'tui-grid/dist/tui-grid.css'


const columns = [
  {name: 'mode', header: 'Mode'},
  {name: 'color', header: 'Color'},
];

const data = [
  {mode: 'line', color: 'blue'},
];

const Table = (props) =>{
  return(
    //<div style={{width:500, height:500}}>
    <Grid 
    data={data}
    columns={columns}
    rowHeight={25}
    bodyHeight={10}
    rowHeaders={["rowNum"]}
    />
    //</div>
  );
};

export default Table;
