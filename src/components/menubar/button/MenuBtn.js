//import { useState } from "react";
import {Button} from "antd";
import 'antd/dist/reset.css';

// const MenuBtn = (props) =>{
//     const { childrend, onClick} = props;
//     return (
//         <button onClick={onClick}>{childrend}</button>
//     )
// }

function MenuBtn({text}){
    //const [name, setName] = useState("");
    //const onClick = () => setName({text})
    //console.log({name})
    return(
    <div>
    <Button type='primary'>{text}</Button>
    </div>
    );
}

export default MenuBtn;