import { useState } from "react";
import axios from 'axios'

function Test(){

    const url = "http://localhost:8080"

    const [id,setId] = useState();
    const [title,setTitle] = useState("");
    
    return(
        <div>
        <input  onChange={(e)=>{
            setId(e.target.value);
          }}/>
        <input onChange={(e)=>{
            setTitle(e.target.value);
          }}/>

        <button
            onClick={
                ()=>{
                axios.get(url + '/drawinglist',{
                    params:{
                    id : id,
                    title : title
                    }
                }).catch(function(){
                    console.log('실패함')
                })
                }}
            >전송</button>
        </div>
    )

}

export default Test;
