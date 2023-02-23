import { useState } from "react";
// const MenuBtn = (props) =>{
//     const { childrend, onClick} = props;
//     return (
//         <button onClick={onClick}>{childrend}</button>
//     )
// }

function MenuBtn({text}){
    const [name, setName] = useState("");
    const onClick = () => setName({text})
    console.log({name})
    return(
    <div>
    <button onClick={onClick}>{text}</button>
    </div>
    );
}

export default MenuBtn;