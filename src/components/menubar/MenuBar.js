import React from "react";
import "./MenuBar.css"
import MenuBtn from "./button/MenuBtn";
import {Link} from "react-router-dom"

function MenuBar(){
    return (
    <div>
        <div className="MenuBar">
            <h2 style={{textAlign:'center'}}>Menu</h2>
            <Link to="drawing">
                <MenuBtn text="Drawing"/>
            </Link>
            <Link to="drawinglist">
                <MenuBtn text="Drawing List"/>
            </Link>
            <div><MenuBtn text="Import"/></div>
            <div><MenuBtn text="Export"/></div>
            <div><MenuBtn text="Save"/></div>
        </div>
    </div>
    );
}

export default MenuBar;