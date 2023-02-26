//import { useState} from "react";
import {Button} from "antd";
import 'antd/dist/reset.css';

function MenuBtn({text}){
    
    return(
        <div>
            <Button 
                    style={{margin:35, width: "100px", height:"30px"}}
                    type='dashed'>
                        {text}
            </Button>
        </div>
    );
}

export default MenuBtn;