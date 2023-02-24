//import { useState} from "react";
import {Button} from "antd";
import 'antd/dist/reset.css';
import Main from "../../../screenMode/Canvas";

// const MenuBtn = (props) =>{
//     const { childrend, onClick} = props;
//     return (
//         <button onClick={onClick}>{childrend}</button>
//     )
// }

function MenuBtn({text}){
    
    return(
    <div>
    <Button onClick={Main}
            style={{margin:35, width: "100px", height:"30px"}}
             type='dashed'>
                {text}
    </Button>
    </div>
    );
}

export default MenuBtn;