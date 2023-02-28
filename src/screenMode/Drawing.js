import React from "react";
import {useRef, useState, useEffect, createElement} from "react";
import { Layout } from "antd";
import "./canvas.css"
import lineimg from './line.png'
import recimg from './rectangle.png'
import 'tui-grid/dist/tui-grid.css'
import Attribute from "../attribute/grid";

const { Content} = Layout;

function Drawing(){

    const [mode, setMode] = useState("line"); //모드 선택
    const [color, setColor] = useState("black"); //색상 선택

    const canvasRef = useRef(null);
    const mouse = useRef(null);

    const [ctx, setCtx] = useState(); 
    const [recpos, setRecPos] = useState([]); // rectangle 위치
    const [linepos, setLinePos] = useState([]); // line 위치
    const [isDraw, setIsDraw] = useState(false); //isDrawing

    const font = '14px sans-serif';

    useEffect(() => {
        const canvas = canvasRef.current;
        setCtx(canvas.getContext("2d"));
    }, []);

    function drawLineStart(e){        
        setIsDraw(true);
        setLinePos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        //버튼 눌렀을 때 시작위치
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        console.log(linepos);
    }
    
    function drawLineEnd(e){
        if(!isDraw) return;
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        console.log(linepos)
        ctx.beginPath() //새로운 선 긋기 => 호출하지 않으면 계속 이어짐.
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(linepos[0], linepos[1]); //마우스 땠을 때 좌표랑 이어줌.
        ctx.stroke();
        setIsDraw(false);
        ctx.closePath();
    }

    function drawRecStart(e){
        setIsDraw(true);
        setRecPos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        console.log(recpos);
    }

    function drawRecEnd(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        ctx.strokeRect(recpos[0], recpos[1], currentX - recpos[0], currentY - recpos[1]);        
        setIsDraw(false);
    }

    function handleCanvasClick(e){
        if(!isDraw) return;
        addInput(e.clientX, e.clientY);
    }

    function addInput(x,y){
        const input = createElement("input",
        {type:"text", onFocus:true ,onKeyDown:handleEnter,style:{position:"fixed", left:`${x-4}px`, top:`${y-4}px`}});
        //canvasRef.current.child
        //input.type = "text";
        //input.style.position = "fixed";
        //input.style.left = `${x-4}px`;
        //input.style.top = `${y-4}px`;
        canvasRef.current.appendChild(input);
        //mouse.current.
        //input.onkeyDown = handleEnter;
        //document.getElementById("canvas").appendChild($input);
        //document.div.appendChild($input);
        // input.focus();
        setIsDraw(true);
        console.log(canvasRef);
    }

    function handleEnter(e){
        const keyCode = e.keyCode;
        if(keyCode === "Enter"){
            drawText(e.target.value, parseInt(e.target.style.left, 10), parseInt(e.target.top, 10));
        document.getElementById("canvas").removeChild(e.target);
        setIsDraw(false)
        };
    }

    function drawText(txt, x, y){
        ctx.textBaseline = "top";
        ctx.textAligh = "left";
        ctx.font = "14px sans-serif";
        ctx.fillText(txt, x-4, y-4);
    }

    

    return (
    <Layout>
        <div className="ColorControl" style={{float:"right", padding:5, width:"50%"}}>
                <button className="color-btn" data-color="black" onClick={() => setColor("black")}></button>
                <button className="color-btn" data-color="red" onClick={() => setColor("red")}></button>
                <button className="color-btn" data-color="green" onClick={() => setColor("green")}></button>
            <button className="color-btn" data-color="blue" onClick={() => setColor("blue")}></button>
        </div>
        <div className="ModeControl" style={{float:"left" , width: "50%"}}>
                <img src={lineimg} width='30' height='30' onClick={() => setMode("line")}></img>
                <img src={recimg} width='30' height='30' onClick={() => setMode("rectangle")}></img>
                <button className="color-btn" data-color="green" onClick={() => setMode("text")}></button>
        </div>
        <Content style={{margin:10 ,padding: "0 20px"}}>
        <div style={{background:"#fff", padding:24, minHeight:500}}>
                    <canvas id="canvas" style={canvasStyle} ref={canvasRef} width={500} height={500} onClick={addInput}
                        
                        onMouseDown={(e) =>
                            {
                                if(mode ==="line"){
                                    drawLineStart(e);
                                }else if(mode === "rectangle"){
                                    drawRecStart(e);
                                }else if(mode === "text"){
                                    handleCanvasClick(e);
                                    addInput(6,6);
                                }
                            }
                        }
                        onMouseUp={(e) =>
                            {
                                if(mode ==="line"){
                                    drawLineEnd(e);
                                }else if(mode === "rectangle"){
                                    drawRecEnd(e);
                                }else if(mode === "text"){
                                    handleCanvasClick(e);
                                }
                            }
                        }
                        onMouseLeave={
                            () => setIsDraw(false)
                        }
                    /> 
                    <div ref={mouse}></div>
                </div>
                
        </Content>
        
    </Layout>
    
    );
}

const canvasStyle = {
    border: "1px solid black",
    display: 'inline-block',
}

export default Drawing;