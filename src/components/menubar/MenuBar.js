import React from "react";
import "./MenuBar.css"
import MenuBtn from "./button/MenuBtn";


function MenuBar(props){
let a = ""

const onClick = () => {
a = "Drawing";
console.log(a);
}
const onClick2 = () =>{
a = "Drawing List"
console.log(a);
}
    return (
    <div>
        <div className="MenuBar">
            <h2 style={{textAlign:'center'}}>Menu</h2>
            <div onClick={onClick}><MenuBtn text="Drawing"/></div>
            <div onClick={onClick2}><MenuBtn text="Drawing List"/></div>
            <div><MenuBtn text="Import"/></div>
            <div><MenuBtn text="Export"/></div>
            <div><MenuBtn text="Save"/></div>
        </div>
    </div>
    );
}

export default MenuBar;