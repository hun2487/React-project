import React from "react";
import {useRef, useState, useEffect} from "react";
import { Layout, Breadcrumb } from "antd";

const { Content} = Layout;

function Drawing2(){
    const canvasRef = useRef(null);
    //const canvasOverlayRef = useRef(null);

    const [ctx, setCtx] = useState(); 
    //const [ctxOverlay, setCtxOverlay] = useState();
    const [pos, setPos] = useState([]); //위치
    const [isDraw, setIsDraw] = useState(false); //isDrawing

    useEffect(() => {
        const canvas = canvasRef.current;
        setCtx(canvas.getContext("2d"));
    }, []);

    function drawStart(e){
        setIsDraw(true);
        setPos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
    }

    function drawSquare(e){
        if (!isDraw) return;

        ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
        ctx.strokeStyle = "red";
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        ctx.strokeRect(pos[0], pos[1], currentX - pos[0], currentY - pos[1]);
    }

    function drawEnd(e){
        let currentX = e.clientX - canvasRef.current.offsetLeft;
        let currentY = e.clientY - canvasRef.current.offsetTop;
        ctx.strokeRect(pos[0], pos[1], currentX - pos[0], currentY - pos[1]);        
        setIsDraw(false);
    }

    return (
    <Layout>
        <Content style={{padding: "0 50px"}}>
            <Breadcrumb style={{margin: "16px 0"}}>
            </Breadcrumb>
                <div style={{background:"#fff", padding:24, minHeight:500}}>
                    <canvas ref={canvasRef} width={700} height={400}
                    onMouseDown={drawStart}
                    onMouseMove={drawSquare}
                    onMouseUp={drawEnd} />
                </div>
        </Content>
    </Layout>
    );
}

export default Drawing2;