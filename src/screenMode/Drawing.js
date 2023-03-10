import React from "react";
import {useRef, useState, useEffect} from "react";
import { Button,Input, Layout} from "antd";
import "./canvas.css";
import lineimg from './line.png';
import recimg from './rectangle.png';
import textimg from './text.png';
import 'tui-grid/dist/tui-grid.css';
import polygonimg from './polygon.png';
import Grid from '@toast-ui/react-grid';
import axios from 'axios';
import { ImportOutlined, ExportOutlined , CloudUploadOutlined, CloudDownloadOutlined, DeleteOutlined} from "@ant-design/icons";

const { Content } = Layout;

function Drawing({gridId}){
    //const url = "http://localhost:8080";
    
    const [list, setList] = useState([]); //Json
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState();
    const [mode, setMode] = useState("line"); //모드 선택
    const [color, setColor] = useState("black"); //색상 선택
    const [lastcoordinate, setLastCoordinate] = useState([]); 
    const [polygon, setPolygon] = useState([]); 
    const [recpos, setRecPos] = useState([]); // rectangle 위치
    const [linepos, setLinePos] = useState([]); // line 위치
    const [isDraw, setIsDraw] = useState(false); //isDrawing
    const [text, setText] = useState();
    const [title, setTitle] = useState();
    const [loadData, setLoadData] = useState();

    const data = [
        {mode: mode, color: color},
      ];
    
    const columns = [
        {name: 'mode', header: 'Mode'},
        {name: 'color', header: 'Color'},
      ];

    const InputRef = () => {
        const selectFile = useRef("");
        return(
            <Button icon={<ImportOutlined />} onClick={() => selectFile.current.click()} style={{left:"290px"}}>
                <input style={{float:"right", display:"none"}} ref={selectFile} type={"file"} onChange={json_file_import}></input>
                ㅤimport
            </Button>
        )
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        setCtx(canvas.getContext("2d"));
    }, []);

    useEffect(() => {
        (async () => {
          Load();
        })();
      },[]);

    function drawLineStart(e){        
        setIsDraw(true);
        setLinePos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        //버튼 눌렀을 때 시작위치
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
    }
    
    function drawLineEnd(e){
        if(!isDraw) return;
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        console.log(linepos)
        ctx.beginPath(); //새로운 선 긋기 => 호출하지 않으면 계속 이어짐.
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(linepos[0], linepos[1]); //마우스 땠을 때 좌표랑 이어줌.
        ctx.stroke();
        ctx.closePath();
        setIsDraw(false);
        const linelist = {
            category: "line",
            mx: currentX,
            my: currentY,
            lx: linepos[0],
            ly: linepos[1],
            color: color,
        }
        setList(list.concat(linelist)); //json 추가
        console.log(JSON.stringify(list));
    }

    function drawPolygon(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        
        setIsDraw(true);
        setPolygon([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
        //마우스 눌렀을 때 커서 위치
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(polygon[0], polygon[1]); //마우스 땠을 때 좌표랑 이어줌.
        ctx.stroke();
        ctx.closePath();
        setLastCoordinate(lastcoordinate.concat(polygon));
        //console.log(polygon);
        const polylist = {
            category: "polygon",
            mx: currentX,
            my: currentY,
            lx: polygon[0],
            ly: polygon[1],
            color: color,
        }
        setList(list.concat(polylist));
        console.log(polylist);
    }

    function drawPolygonclose(){
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(polygon[0],polygon[1]);
        ctx.lineTo(lastcoordinate[0], lastcoordinate[1]); //처음 좌표
        ctx.stroke();
        ctx.closePath();

        const lastpolylist = {
            category: "polygon",
            mx: polygon[0],
            my: polygon[1],
            lx: lastcoordinate[0],
            ly: lastcoordinate[1],
            color: color,
        }

        console.log(lastpolylist);
        setList(list.concat(lastpolylist));
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
        const reclist = {
            category: "rectangle",
            mx: recpos[0],
            my: recpos[1],
            lx: currentX-recpos[0],
            ly: currentY-recpos[1],
            color: color,
        }
        setList(list.concat(reclist)); //json 추가.
        console.log(recpos[0], recpos[1], currentX - recpos[0], currentY - recpos[1])
        console.log(list);
    }

    
    function click(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;

        console.log(currentX, currentY);
    }

    function AddInput(bool){
        return (
            <Input
            style={{width:"200px",
                    left:"30px"}}
            onKeyDown={handleEnter}
            //disabled={bool}
            placeholder={"text를 입력하세요."}
            required
            />
        );
    }

    function handleEnter(e){
        const keyCode = e.keyCode;
        if(keyCode === 13){
            setText(e.target.value);
        };
    }

    function onChange(e){
        const input = e.target.value;
        setTitle(input);
        console.log(title);
    }

    // function onChangeid(e){
    //     const input = e.target.value;
    //     setId(input);
    //     console.log(id);
    // }

    function drawText(e){
        if(text === undefined){
            alert("text를 입력하세요")
        }else{
            let currentX = e.clientX - canvasRef.current.offsetLeft;
            let currentY = e.clientY - canvasRef.current.offsetTop;
            ctx.textBaseline = "top";
            ctx.textAligh = "left";
            ctx.font = "14px sans-serif";
            ctx.fillStyle = color;
            ctx.fillText(text, currentX, currentY);
            const textlist = {
                category: "text",
                text: text,
                lx: currentX,
                ly: currentY,
                color: color,
            }
            setList(list.concat(textlist));
        }
    }

    function clearCanvas(){ //canvas 초기화
        ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
        setList([])
    }

    function json_file_export(){ //파일 export
            const fileName = 'draw.json';
            const output = JSON.stringify(list);
            const element = document.createElement('a');
             const file = new Blob([output], {
                 type: "text/json",
             });
            element.href = URL.createObjectURL(file);
            element.download = fileName;
            element.click();
    }

    function json_file_import(e){
        const file = e.target.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = handleFileRead;
            reader.readAsText(file);
        }

    function handleFileRead(e){
        const jsonData = JSON.parse(e.target.result);
        for(var i=0; i<jsonData.length; i++){ //Json file 한 줄씩 읽기.
            let type = jsonData[i];
            console.log(type);
            if(type.category === 'line'){ //line import
                setIsDraw(true);
                ctx.strokeStyle = type.color;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(type.mx,type.my);
                ctx.lineTo(type.lx, type.ly);
                ctx.stroke();
                ctx.closePath();
                setIsDraw(false);
            }else if(type.category === 'rectangle'){ //rectangle import
                setIsDraw(true);
                ctx.strokeStyle = type.color;
                ctx.lineWidth = 3;
                ctx.strokeRect(type.mx, type.my, type.lx, type.ly);
                setIsDraw(false);
            }else if(type.category === "text"){ //text import
                ctx.textBaseline="top";
                ctx.font = "14px sans-serif";
                ctx.fillStyle = type.color;
                ctx.fillText(type.text, type.lx, type.ly);
            }else if(type.category === "polygon"){ //polygon import
                setIsDraw(true);
                ctx.strokeStyle = type.color;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(type.mx, type.my);
                ctx.lineTo(type.lx, type.ly);
                ctx.stroke();
                ctx.closePath();
                setIsDraw(false);
                }
            }
        }
    }

    function Save(){
        if(title === undefined){
            alert("Title을 입력하세요");
        }else{
        axios.post('/drawing',
        { 
            "title": title,
            "canvas": JSON.stringify(list)} //Json string으로 변환하여 서버로 post
        ,{
            headers: {
                "Content-Type" : "application/json", //// `application/json`, //서버에 json으로 보냄
            }
        }).then((res) =>{
            console.log(res)
            })
            setTitle()
        }
    }

    function Load(){
        axios.get(`/drawing/${gridId}`)
             .then((res) => {
                const newData = JSON.parse(res.data.canvas);
                setLoadData(newData);
            })
            .catch((Error) =>{
                console.log(Error);
            });
            console.log(loadData.length);
            for(var i=0; i<loadData.length; i++){ //Json file 한 줄씩 읽기.
                let type = loadData[i];
                console.log(type);
                if(type.category === 'line'){
                    setIsDraw(true);
                    ctx.strokeStyle = type.color;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(type.mx,type.my);
                    ctx.lineTo(type.lx, type.ly);
                    ctx.stroke();
                    ctx.closePath();
                    setIsDraw(false);
                }else if(type.category === 'rectangle'){
                    setIsDraw(true);
                    ctx.strokeStyle = type.color;
                    ctx.lineWidth = 3;
                    ctx.strokeRect(type.mx, type.my, type.lx, type.ly);
                    setIsDraw(false);
                }else if(type.category === "text"){
                    ctx.textBaseline="top";
                    ctx.font = "14px sans-serif";
                    ctx.fillStyle = type.color;
                    ctx.fillText(type.text, type.lx, type.ly);
                }else if(type.category === "polygon"){
                    setIsDraw(true);
                    ctx.strokeStyle = type.color;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(type.mx, type.my);
                    ctx.lineTo(type.lx, type.ly);
                    ctx.stroke();
                    ctx.closePath();
                    setIsDraw(false);
                    }
                }
    }
    return (
    <Layout>
        <div className="ColorControl" style={{float:"right", padding:5, width:"80%"}}>
                <button className="color-btn" data-color="black" onClick={() => setColor("black")}></button>
                <button className="color-btn" data-color="red" onClick={() => setColor("red")}></button>
                <button className="color-btn" data-color="green" onClick={() => setColor("green")}></button>
                <button className="color-btn" data-color="blue" onClick={() => setColor("blue")}></button>
                <img src={lineimg} width='30' height='30' onClick={() => setMode("line")}></img>
                <img src={recimg} width='30' height='30' onClick={() => setMode("rectangle")}></img>
                <img src={textimg} width='30' height='30'  onClick={() => setMode("text")}></img>
                <img src={polygonimg} width='30' height='30'  onClick={() => setMode("polygon")}></img>
                <button className="color-btn" data-color="blue" onClick={() => setMode("click")}></button>
                <AddInput bool={true} /> 
                <Button disabled={false} onClick={drawPolygonclose} style={{left:"50px"}}>poly draw</Button>
                <Button icon={<ExportOutlined/>} disabled={false} onClick={json_file_export} style={{left:"290px"}}>export</Button>
                <InputRef />
        </div>
        <Content className="container" style={{margin:10 ,padding: "0 20px"}}>
            <div>Title: 
            <Input style={{width:"200px",left:"20px"}}
            onChange={onChange}
            value={title}
            placeholder={"Title를 입력하세요."}
            required
            />
            <Button icon={<DeleteOutlined />} style={{left:"20px"}} onClick={clearCanvas}></Button>
            <Button icon={<CloudUploadOutlined />} style={{left:"545px"}} onClick={Save}>Save</Button>
            <Button icon={<CloudDownloadOutlined/>} style={{left:"545px"}} onClick={Load}>Load</Button>
            </div>
                    <canvas className="canvas" style={canvasStyle} ref={canvasRef} width={800} height={500} 
                        onMouseDown={(e) =>
                            {
                                if(mode ==="line"){
                                    drawLineStart(e);
                                }else if(mode === "rectangle"){
                                    drawRecStart(e);
                                }else if(mode === "text"){
                                    drawText(e);
                                }else if(mode ==="polygon"){
                                    drawPolygon(e);
                                }else if(mode === "click"){
                                    click(e);
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
                     <div className="grid" style={{width:300, flex:50, display: "inline-block"}}>
                        <Grid data={data} columns={columns} rowHeight={25} bodyHeight={30}/>
                    </div>
        </Content>
    </Layout>
    );
}

const canvasStyle = {
    border: "1px solid black",
     display: 'inline-block',
    background: "white" 
}

export default Drawing;