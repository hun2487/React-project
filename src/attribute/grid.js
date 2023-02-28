import Grid from 'tui-grid'
import 'tui-grid/dist/tui-grid.css'

const data = [
    {mode: 'line', color: 'blue'},
  ];
  
const columns = [
    {name: 'mode', header: 'Mode'},
    {name: 'color', header: 'Color'},

  ];

function Attribute() {
    
      return(
            <Grid
            data={data}
            columns={columns}
            rowHeight={25}
            bodyHeight={100}
            heightResizable={true}
            rowHeaders={['rowNum']}
            draggable={true}
            />
      )
}



export default Attribute;
