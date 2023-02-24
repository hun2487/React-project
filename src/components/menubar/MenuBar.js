import React from "react";
import "./MenuBar.css"
import MenuBtn from "./button/MenuBtn";


function MenuBar(){

    return (
    <div>
        <div className="MenuBar">
            <h2 style={{textAlign:'center'}}>Menu</h2>
            <div><MenuBtn text="Drawing"/></div>
            <div><MenuBtn text="Drawing List"/></div>
            <div><MenuBtn text="Import"/></div>
            <div><MenuBtn text="Export"/></div>
            <div><MenuBtn text="Save"/></div>
        </div>
    </div>);
}

export default MenuBar;