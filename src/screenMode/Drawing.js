import React from "react";
import {useRef, useState, useEffect} from "react";
import { Layout } from "antd";
import "./canvas.css";
import lineimg from './line.png';
import recimg from './rectangle.png';
import textimg from './text.png';
import 'tui-grid/dist/tui-grid.css';
import polygonimg from './polygon.png';
import Grid from 'tui-grid';

const { Content } = Layout;

function Drawing(){
    const data = [
        {mode: 'line', color: 'blue'},
      ];
      
      const columns = [
        {name: 'mode', header: 'Mode'},
        {name: 'color', header: 'Color'},
    
      ];

    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState();

    const [mode, setMode] = useState("line"); //모드 선택
    const [color, setColor] = useState("black"); //색상 선택

    const [count, setCount] = useState(0);
    const [lastcoordinate, setLastCoordinate] = useState([]); 
    const [polygon, setPolygon] = useState([]); 
     
    const [recpos, setRecPos] = useState([]); // rectangle 위치
    const [linepos, setLinePos] = useState([]); // line 위치
    const [isDraw, setIsDraw] = useState(false); //isDrawing
    const [text, setText] = useState();

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
        ctx.closePath();
        setIsDraw(false);
    }

    function drawPolygon(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        
        setCount(count+1)
        setIsDraw(true);
        setPolygon([count ,e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        //버튼 눌렀을 때 시작위치
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        console.log(currentX, currentY)
        ctx.beginPath()
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(polygon[1], polygon[2]); //마우스 땠을 때 좌표랑 이어줌.
        ctx.stroke();
        ctx.closePath();
        setLastCoordinate(lastcoordinate.concat(polygon));
    }

    function drawPolygondouble(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.beginPath()
        //ctx.moveTo(coordinate[0], coordinate[1]);
        ctx.moveTo(polygon[1],polygon[2]);
        ctx.lineTo(lastcoordinate[1], lastcoordinate[2]); //처음 좌표
        ctx.stroke();
        ctx.closePath();
        //값 초기화
        setPolygon([]);
        setLastCoordinate([]);
    }

    function drawPolygonPoint(){
        if(!isDraw) return;
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

    function AddInput(bool){
        return (
            <input
            style={{width:"200px"}}
            onKeyDown={handleEnter}
            //disabled={bool}
            placeholder={"enter를 입력하세요."}
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
        ctx.fillStyle = color;
        ctx.fillText(text, currentX, currentY);
    }

    function A(){
       
      
        return(
          <Grid 
          data = {data}
          columns={columns}
          clientWidth={30}
          // rowHeight={2}
          // bodyHeight={10}
          // rowHeaders={["rowNum"]}
          // onEditingStart={()=>console.log("gdgd")}
        />
        )
      };

    return (
    <Layout>
        <div className="ColorControl" style={{float:"right", padding:5, width:"50%"}}>
                <button className="color-btn" data-color="black" onClick={() => setColor("black")}></button>
                <button className="color-btn" data-color="red" onClick={() => setColor("red")}></button>
                <button className="color-btn" data-color="green" onClick={() => setColor("green")}></button>
                <button className="color-btn" data-color="blue" onClick={() => setColor("blue")}></button>
                
                <img src={lineimg} width='30' height='30' onClick={() => setMode("line")}></img>
                <img src={recimg} width='30' height='30' onClick={() => setMode("rectangle")}></img>
                <img src={textimg} width='30' height='30'  onClick={() => setMode("text")}></img>
                <img src={polygonimg} width='30' height='30'  onClick={() => setMode("polygon")}></img>
                <AddInput bool={true} />
                <button disabled={false} onClick={drawPolygondouble}>poly draw</button>
        </div>
        <Content style={{margin:10 ,padding: "0 20px", flex:1.5}}>
        
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
                    
                    <div id="gridbox" style={{width:800,height:800, flex:0.5, display: "inline"}}>
                        {/* <Grid data={data} columns={columns} clientWidth={100}/> */}
                    </div>
        </Content>
        
    </Layout>
    );
}

const canvasStyle = {
    border: "1px solid black"
    // display: 'inline-block',
}

export default Drawing;