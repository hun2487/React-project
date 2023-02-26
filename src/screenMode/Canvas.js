import useOnDraw from "./Drawing/Drawing";
//import React, { useRef, useEffect, useState } from 'react'

//const defaultStyle = { border: '1px solid gray', display: 'inline-block', margin: '1rem' }
import { Layout, Breadcrumb } from "antd";

const {Content} = Layout;


const Canvas = () => {
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 2);
        console.log(point.x);
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        //ctx.strokeRect(start.x, start.y,end.x-start.x, end.y-start.y)
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        //ctx.fillStyle = color;
        //ctx.beginPath();
        //ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        //ctx.fill();
    }


    return(
    <Layout>
        <Content style={{padding: "0 50px"}}>
            <Breadcrumb style={{margin: "16px 0"}}>
            </Breadcrumb>
    <div style={{background:"#fff", padding:24, minHeight:500}}>
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