import useOnDraw from "./Drawing/Drawing";
//import React, { useRef, useEffect, useState } from 'react'

//const defaultStyle = { border: '1px solid gray', display: 'inline-block', margin: '1rem' }

// function Drawing(){
//     const canvasRef = useRef(null);
//     const [ctx, setCtx] = useState();
//     const [pos, setPos] = useState([]);
//     const [isDraw, setIsDraw] = useState(false);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         setCtx(canvas.getContext("2d"));
//     }, []);

//     function drawStart(e){
//         setIsDraw(true);
//         setPos([e.clientX - canvasRef.current.offsetLeft, e.clientY - canvasRef.current.offsetTop])
//     }

//     function drawSquare(e){
//         if (!isDraw) return;

//         ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
//         ctx.strokeStyle = "red";
//         let currentX = e.clientX - canvasRef.current.offsetLeft;
//         let currentY = e.clientY - canvasRef.current.offsetTop;
//         ctx.strokeRect(pos[0], pos[1], currentX - pos[0], currentY - pos[1]);
//     }

//     function drawEnd(){
//         setIsDraw(false);
//     }

//     return (
//     <div className='container' >
//         <canvas ref={canvasRef} width={700} height={400} style={defaultStyle}
//         onMouseDown={drawStart}
//         onMouseMove={drawSquare}
//         onMouseUp={drawEnd} />
//     </div>
//     )
// }
const Canvas = () => {

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
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
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    return(
        <canvas
            width="700"
            height="300"
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );

}

const canvasStyle = {
    border: "1px solid black"
}

export default Canvas;