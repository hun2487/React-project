import {Button} from "antd";

function MenuBtn({text}){
    
    return(
            <Button 
                    style={{margin:35, width: "100px", height:"30px"}}
                    type='dashed'>
                        {text}
            </Button>
    );
}

export default MenuBtn;