import Grid from '@toast-ui/react-grid'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tui-grid/dist/tui-grid.css'

function Table(props){

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const columns = [
    {name: 'id', header: 'ID', width: 100, },
    {name: 'name', header: 'Title', width:300},
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
            const newData = res.data.map((x,idx) => ({key:idx, id: x.id, name: x.title}));
            console.log(newData);
            setData(newData);
          }).catch((Error) => {
            console.log(Error);
          });

}

function getRowNum(object){
  props.setData(object['rowKey'] + 1);
  navigate("/drawing");
}
  return(
    <div id="grid" style={{width:"350px" , right:"300px", display:"grid"}}>
          <Grid 
      bodyHeight={"auto"}
      data={data}
      columns={columns}
      onDblclick={getRowNum}
    />
    </div> 
  );
};

export default Table;
