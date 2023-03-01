import React from "react";
import {useRef, useState, useEffect} from "react";
import { Layout } from "antd";
import "./canvas.css"
import lineimg from './line.png'
import recimg from './rectangle.png'
import textimg from './text.png'
import 'tui-grid/dist/tui-grid.css'

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
    const [text, setText] = useState();
    const [polygon, setPolygon] = useState([]);
    const a = null;

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

    function drawPolygon(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        setIsDraw(true);
        setPolygon([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        //버튼 눌렀을 때 시작위치
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        console.log(polygon);
        ctx.beginPath()
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(polygon[0], polygon[1]); //마우스 땠을 때 좌표랑 이어줌.
        ctx.stroke();
        ctx.closePath();
    }

    function drawPolygonPoint(e){
        if(!isDraw) return;
        
        setIsDraw(false);
        ctx.closePath();
    }

    function drawLineEnd(e){
        ctx.lineto()
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

    function AddInput(){
        return (
            <input
            style={{width:"200px"}}
            onKeyDown={handleEnter}            
            />
        );
    }

    function handleEnter(e){
        const keyCode = e.keyCode;
        if(keyCode === 13){
            setText(e.target.value);
        };
    }

    function drawText(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        ctx.textBaseline = "top";
        ctx.textAligh = "left";
        ctx.font = "14px sans-serif";
        ctx.fillText(text, currentX, currentY);
        //setIsDraw(false)
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
                <img src={textimg} width='30' height='30'  onClick={() => setMode("text")}></img>
                <button className="color-btn" data-color="blue" onClick={() => setMode("polygon")}></button>
        </div>
        <AddInput />
        <Content style={{margin:10 ,padding: "0 20px"}}>
        <div style={{background:"#fff", padding:24, minHeight:500}}>
                    <canvas id="canvas" style={canvasStyle} ref={canvasRef} width={500} height={500} 
                        onMouseDown={(e) =>
                            {
                                if(mode ==="line"){
                                    drawLineStart(e);
                                }else if(mode === "rectangle"){
                                    drawRecStart(e);
                                }else if(mode === "text"){
                                    //handleEnter(e);
                                    drawText(e);
                                }else if(mode ==="polygon"){
                                    drawPolygon(e);
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
                                    handleEnter(e);
                                }else if(mode === "polygon"){
                                    drawPolygonPoint(e);
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