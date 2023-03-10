import {Button} from "antd";

function MenuBtn({text, onClick}){
    
    return(
            <Button 
                    style={{margin:35, width: "100px", height:"30px"}}
                    type='dashed'
                    onClick={onClick}>
                        {text}
            </Button>
    );
}
export default MenuBtn;