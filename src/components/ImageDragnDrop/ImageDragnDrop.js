import React, { useState } from 'react'
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  border: '2px dashed #aaa',
  height:"10rem",
  width:"10rem",
  textAlign: 'center',
  cursor: 'pointer',
});

function ImageDragnDrop() {
    const [droppedImage, setDroppedImage] = useState(null);
    const handleDragOver = (event) => {
        event.preventDefault();
      };
    
      const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        // Handle the dropped file
        const reader = new FileReader();

    reader.onload = () => {
      setDroppedImage(reader.result);
    };

    reader.readAsDataURL(file);
      };
  return (
    <Container onDragOver={handleDragOver} onDrop={handleDrop}>
      {droppedImage ? (
        <img src={droppedImage} alt="Dropped" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      ) : (
        <p>Drag and drop an image here</p>
      )}
    </Container>
  )
}

export default ImageDragnDrop
