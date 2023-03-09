import Grid from '@toast-ui/react-grid'
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'tui-grid/dist/tui-grid.css'

function Table(){

  const [data, setData] = useState([]);

  const columns = [
    {name: 'id', header: 'ID'},
    {name: 'name', header: 'Name'},
  ];

  useEffect(() => {
    (async () => {
      DrawList();
    })();
  },[]);

  function DrawList(){
    axios.get('/drawing/list')
          .then((res) => {
            console.log(res.data);
            const newData = res.data.map((x,idx) => ({key:idx, id: x.id, name: x.canvas}));
            console.log(newData);
            setData(newData);
          }).catch((Error) => {
            console.log(Error);
          });

}
  return(
    <div>
    {/* {id.map((it)=>(
      <Grid 
      rowHeaders={['rowNum']}
      data={[{id: it.id, name: it.canvas }]}
      columns={columns}
      rowHeight={25}
      bodyHeight={100}
    />
    ))
      } */}
          <Grid 
      data={data}
      columns={columns}
    />
      </div> 
  );
};

export default Table;
