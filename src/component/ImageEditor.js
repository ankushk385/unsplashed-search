// components/ImageEditor.js
import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

function ImageEditor({ imageUrl }) {
  const canvasRef = useRef(null);              // HTML canvas reference
  const fabricCanvasRef = useRef(null); 
  const imageRef = useRef(null);

  useEffect(() => {
    // Initialize Fabric canvas only once when component mounts
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 400,
    });

    // Load image into the Fabric canvas
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.scaleToWidth(fabricCanvasRef.current.width);
        img.selectable = false;  // Make image non-selectable (optional)
        
        imageRef.current = img;  // Store the image reference for layering
       fabricCanvasRef.current.sendToBack(img);
        fabricCanvasRef.current.add(img);
      },
      { crossOrigin: 'anonymous' }  // Enable cross-origin for the image
    );
    // Cleanup: dispose of the Fabric canvas on component unmount
    return () => {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    };
  }, [imageUrl]);

  // Function to add text to the canvas
  const addText = () => {
    const text = new fabric.Textbox('Editable Text', {
      left: 50,
      top: 50,
      fill: '#333',
      fontSize: 20,
    });
    fabricCanvasRef.current.add(text); // Use fabricCanvasRef here to add text
  };

  const addShape = (shapeType) => {
    let shape;
    const options = {
      left: 100,
      top: 100,
      fill: '#ff5722',
      width: 100,
      height: 100,
    };
    
    // Use fabricCanvasRef here to add text

    switch (shapeType) {
      case 'circle':
        shape = new fabric.Circle({
          ...options,
          radius: 50,  // Radius for circle instead of width/height
        });
        break;
      case 'triangle':
        shape = new fabric.Triangle(options);
        break;
      case 'rectangle':
        shape = new fabric.Rect(options);
        break;
      default:
        return;
    }
    fabricCanvasRef.current.add(shape);
  };

  // Function to save the canvas as an image
  const saveCanvas = () => {
    const link = document.createElement('a');
    link.href = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
    });
    link.download = 'edited-image.png';
    link.click();
  };

  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
      <h2>Add caption Page</h2>
<div className='container'>
<div className='img-div'><canvas ref={canvasRef} width="600" height="400"></canvas></div>
      <div className='button-div' style={{display:"flex",justifyContent:"space-evenly",flexDirection:"column"}}>
      <button onClick={() => addText(canvasRef.current)}>Add Text</button>
      <button onClick={() => addShape('circle')}>Add Circle</button>
      <button onClick={() => addShape('triangle')}>Add triangle</button>
      <button onClick={() => addShape('rectangle')}>Add rectangle</button>
      <button style={{width:"450px",border: "4px solid black"}} onClick={() => saveCanvas(canvasRef.current)}>Download Image</button>

      </div>
</div>
     
      
      
    </div>
  );
}





export default ImageEditor;
