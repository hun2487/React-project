import useOnDraw from "./Drawing/Drawing";
import "./canvas.css"

import { Layout } from "antd";
import { useState } from "react";

const {Content} = Layout;


const Canvas = () => {

    const [color, setColor] = useState("black");
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);


    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, color, 2);
        console.log("prev");
        console.log(prevPoint);
        console.log("point" );
        console.log(point); //ClientX, clientY
        console.log("-------------------------")
        //drawSqure(prevPoint, point, ctx, color);
        //drawText(ctx);
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        start = start ?? end;
        ctx.beginPath(); // 새로운 경로를 만든다. 
        ctx.lineWidth = width; //선 두께
        ctx.strokeStyle = color; //색상 선택
        ctx.moveTo(start.x, start.y); //펜을 x,y의 지정된 좌표로 옮긴다
        ctx.lineTo(end.x, end.y); //현재 드로잉 위치에서 x와 y로 지정된 위치까지 그림
        ctx.stroke();

        // ctx.fillStyle = color;
        // ctx.beginPath();
        // ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        // ctx.fill();
    }
    // function drawText(ctx){
    //     ctx.onClick()
    // }

    function drawSqure(
        start,
        end,
        ctx,
        color
    ){
        ctx.clearRect(0, 0, 700, 300);
        ctx.strokeStyle = color;
        ctx.strokeRect(start.x, start.y, end.x- start.x, end.y- start.y);
    }

    return(
    <Layout>
        <Content style={{margin:30, padding: "0 50px"}}>
        <div className="control">
            <button className="color-btn" data-color="black" onClick={() => setColor("black")}></button>
            <button className="color-btn" data-color="red" onClick={() => setColor("red")}></button>
            <button className="color-btn" data-color="green" onClick={() => setColor("green")}></button>
            <button className="color-btn" data-color="blue" onClick={() => setColor("blue")}></button>
        </div>
    <div style={{background:"#fff", padding:100, minHeight:500}}>
        <canvas
            width="700"
            height="300"
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
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

export default Canvas;