import React from "react";
import {useRef, useState, useEffect} from "react";
import { Layout } from "antd";
import "../canvas.css"
import {LineOutlined} from "@ant-design/icons"

const { Content} = Layout;

function Drawing2(){

    const [mode, setMode] = useState("line"); //모드 선택
    const [color, setColor] = useState("black"); //색상 선택

    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(); 
    const [recpos, setRecPos] = useState([]); // rectangle 위치
    const [linepos, setLinePos] = useState([]); // line 위치
    const [isDraw, setIsDraw] = useState(false); //isDrawing

    useEffect(() => {
        const canvas = canvasRef.current;
        setCtx(canvas.getContext("2d"));
    }, []);

    function drawLineStart(e){
        
        setIsDraw(true);
        setLinePos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        //버튼 눌렀을 때 시작위치

        ctx.strokeStyle = color;
        console.log(linepos);
    }

    function drawLine(e){
        if(!isDraw) return;
        let currentX2 = e.clientX - canvasRef.current.offsetLeft;
        let currentY2 = e.clientY - canvasRef.current.offsetTop;
        ctx.lineWidth = 3;
        //ctx.moveTo(currentX2, currentY2); //마우스 이동
    }

    function drawLineEnd(e){
        let currentX2 = e.clientX - canvasRef.current.offsetLeft;
        let currentY2 = e.clientY - canvasRef.current.offsetTop;
        console.log(linepos)
        ctx.moveTo(currentX2, currentY2);
        ctx.lineTo(linepos[0], linepos[1]); //마우스 땠을 때 좌표랑 이어줌.
        ctx.stroke();
        setIsDraw(false);
        ctx.closePath();
    }

    function drawStart(e){
        setIsDraw(true);
        setRecPos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        console.log(recpos);
    }

    // function drawSquare(e){
    //     if(!isDraw) return;

    //     let currentX2 = e.clientX - canvasRef.current.offsetLeft;
    //     let currentY2 = e.clientY - canvasRef.current.offsetTop;

    //     ctx.lineWidth = 3;
    //     ctx.strokeStyle = "black";
    //     console.log(recpos)
    //     //ctx.moveTo(recpos[0], recpos[1])
    //     //ctx.lineTo(currentX2, currentY2) 
    // }

    function drawEnd(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        ctx.strokeRect(recpos[0], recpos[1], currentX - recpos[0], currentY - recpos[1]);        
        setIsDraw(false);
    }

    return (
    <Layout>
        <Content style={{margin:30 ,padding: "0 50px"}}>
        <div className="ModeControl">
                
                <LineOutlined onClick={() => setMode("line")} />
                
                <button className="color-btn" data-color="red" onClick={() => setMode("rectangle")}></button>
            </div>
            <div className="ColorControl" style={{float:"right", padding:5}}>
                <button className="color-btn" data-color="black" onClick={() => setColor("black")}></button>
                <button className="color-btn" data-color="red" onClick={() => setColor("red")}></button>
                <button className="color-btn" data-color="green" onClick={() => setColor("green")}></button>
            <button className="color-btn" data-color="blue" onClick={() => setColor("blue")}></button>
            </div>
                <div style={{background:"#fff", padding:24, minHeight:500}}>
                    <canvas style={canvasStyle} ref={canvasRef} width={500} height={500}
                        onMouseDown={(e) =>
                            {
                                if(mode ==="line"){
                                    //setIsDraw(true);
                                    drawLineStart(e);
                                }else if(mode === "rectangle"){
                                    drawStart(e)
                                }
                            }
                        }
                        onMouseMove = {(e) =>
                            {
                                if(mode ==="line"){
                                    //drawLine(e)
                                }else if(mode === "rectangle"){
                                    //drawSquare(e)
                                }
                            }
                        }
                        onMouseUp={(e) =>
                            {
                                if(mode ==="line"){
                                    drawLineEnd(e);
                                }else if(mode === "rectangle"){
                                    drawEnd(e)
                                }
                            }
                        }
                        onMouseLeave={
                            () => setIsDraw(false)
                        }
                    /> 
                </div>
        </Content>
    </Layout>
    );
}

const canvasStyle = {
    border: "1px solid black",
    display: 'inline-block',
}

export default Drawing2;