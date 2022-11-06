import React from 'react';


const RLBorder = ({children}: any)=>{
    
    const canvasRef = React.useRef(null);
   
    const [dimensions, setDimensions] = React.useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    });

    React.useEffect(() => {
        const handleResize = ()=>{
            setTimeout(()=>{
                setDimensions({
                    height: window.innerHeight,
                    width: window.innerWidth
                });
            },100);
        }
        
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])
   
    React.useEffect(()=>{
        console.log("Redraw..");
        if(canvasRef.current){
            const canvas = canvasRef.current as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
             
            if(ctx){
                ctx.clearRect(0, 0, dimensions.width, dimensions.height);
                ctx.fillStyle = "rgba(0,0,0)";
                ctx.fillRect(0, 0,  dimensions.width, dimensions.height);
            
                ctx.beginPath();
                ctx.moveTo(10, 10);
                ctx.lineTo(dimensions.width*0.7, 10);
                ctx.lineTo(dimensions.width*0.7+10, 20);
                ctx.lineTo(dimensions.width*0.9, 20);
                ctx.lineTo(dimensions.width*0.9+10, 10);
                ctx.lineTo(dimensions.width-10, 10);
                ctx.lineTo(dimensions.width-10, dimensions.height-10);
                ctx.lineTo(dimensions.width*0.3, dimensions.height-10);
                ctx.lineTo(dimensions.width*0.3-10, dimensions.height-20);
                ctx.lineTo(dimensions.width*0.1+10, dimensions.height-20);
                ctx.lineTo(dimensions.width*0.1, dimensions.height-10);
                ctx.lineTo(10, dimensions.height-10);
                ctx.closePath();
                ctx.lineWidth = 2;
                // set line color
                ctx.strokeStyle = '#ff0000';
                ctx.stroke();
                ctx.moveTo(10,10);
            }
        }
    }, [canvasRef.current, dimensions])

return (
    <div className="overflow-hidden w-full h-full">
        <canvas 
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            className="absolute "
            />

        {children}
    </div>
);

};


export default RLBorder;