import React, { useState, useRef, useEffect } from 'react';

function Custom({ setSearchSection }) {
  useEffect(() => {
    setSearchSection(false);
  }, []);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [topText, setTopText] = useState('');
  const [middleText, setMiddleText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(30);
  const [topPosition, setTopPosition] = useState({ x: 0.1, y: 0.1 });
  const [middlePosition, setMiddlePosition] = useState({ x: 0.5, y: 0.5 });
  const [bottomPosition, setBottomPosition] = useState({ x: 0.9, y: 0.9 });
  const canvasRef = useRef(null);
  

  const realToCanvas = (realX, realY) => {
    const canvas = canvasRef.current;
    return {
      x: realX * canvas.width,
      y: realY * canvas.height,
    };
  };

  const updateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element is not available.');
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      console.error('2D context is not available.');
      return;
    }
  
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    if (image || imageUrl) { // Check both image and imageUrl
      const imageElement = new Image();
      if (imageUrl) {
        // Use the provided image URL if available
        imageElement.src = imageUrl;
      } else {
        // Use the uploaded image if no URL is provided
        imageElement.src = image;
      }
      imageElement.onload = () => {
        context.drawImage(
          imageElement,
          0,
          0,
          canvas.width,
          canvas.height
        );
  
        context.fillStyle = textColor;
        context.font = `${fontSize}px Arial`;
  
        const topCanvasPosition = realToCanvas(
          topPosition.x,
          topPosition.y
        );
        context.fillText(topText, topCanvasPosition.x, topCanvasPosition.y);
  
        const middleCanvasPosition = realToCanvas(
          middlePosition.x,
          middlePosition.y
        );
        context.fillText(
          middleText,
          middleCanvasPosition.x,
          middleCanvasPosition.y
        );
  
        const bottomCanvasPosition = realToCanvas(
          bottomPosition.x,
          bottomPosition.y
        );
        context.fillText(
          bottomText,
          bottomCanvasPosition.x,
          bottomCanvasPosition.y
        );
      };
    }
  };
  

  useEffect(() => {
    updateCanvas();
  }, [
    image,
    imageUrl,
    topText,
    middleText,
    bottomText,
    textColor,
    fontSize,
    topPosition,
    middlePosition,
    bottomPosition,
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(null); // Clear the image URL when uploading a file
      setImageUrl(imageUrl);
    }
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
    setImage(event.target.value); // Set the image variable when URL changes
  };

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleMiddleTextChange = (event) => {
    setMiddleText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value, 10));
  };

  const handlePositionChange = (positionName, field, value) => {
    switch (positionName) {
      case 'top':
        setTopPosition({ ...topPosition, [field]: value });
        break;
      case 'middle':
        setMiddlePosition({ ...middlePosition, [field]: value });
        break;
      case 'bottom':
        setBottomPosition({ ...bottomPosition, [field]: value });
        break;
      default:
        break;
    }
  };

  const handleDownload = () => {
    try{
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'edited-image.png';
    link.click();}
    catch(err){
      console.log(err)
      alert('Error occured ! Please Refresh or To download the edited image, right-click the image and select "Save link as" or "Copy link address"')
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-[100%] min-h-screen pt-24'>
      <h1 className='text-3xl font-bold mb-4'>Custom Editor</h1>
      <div className='text-lg w-11/12 md:w-3/4 bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row md:space-x-4'>
        <div className='w-full md:w-1/2'>
          <label className='block mb-2 text-gray-600'>Upload Image</label>
          <input
            type='file'
            className='w-full p-2 border rounded-lg'
            accept='image/*'
            onChange={handleImageUpload}
          />
          <label className='block mt-4 mb-2 text-gray-600'>or Image URL (not recommended)</label>
          <input
            type='url'
            className='w-full p-2 border rounded-lg'
            placeholder='Enter image URL'
            value={imageUrl}
            onChange={handleImageUrlChange}
          />
          <label className='block mt-4 mb-2 text-gray-600'>Top Text</label>
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            placeholder='Enter top text'
            value={topText}
            onChange={handleTopTextChange}
          />
          <label className='block mt-4 mb-2 text-gray-600'>Middle Text</label>
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            placeholder='Enter middle text'
            value={middleText}
            onChange={handleMiddleTextChange}
          />
          <label className='block mt-4 mb-2 text-gray-600'>Bottom Text</label>
          <input
            type='text'
            className='w-full p-2 border rounded-lg'
            placeholder='Enter bottom text'
            value={bottomText}
            onChange={handleBottomTextChange}
          />
          <label className='block mt-4 mb-2 text-gray-600'>Text Color</label>
          <input
            type='color'
            className='w-full p-2 border rounded-lg'
            value={textColor}
            onChange={handleTextColorChange}
          />
          <label className='block mt-4 mb-2 text-gray-600'>Font Size</label>
          <input
            type='number'
            className='w-full p-2 border rounded-lg'
            placeholder='Font size'
            value={fontSize}
            onChange={handleFontSizeChange}
          />
          <div className='mt-4'>
            <label className='block mb-2 text-gray-600'>Top Text Position</label>
            <div className='flex space-x-2'>
              <input
                type='number'
                className='w-1/2 p-2 border rounded-lg'
                placeholder='X'
                value={topPosition.x}
                onChange={(e) =>
                  handlePositionChange('top', 'x', parseFloat(e.target.value))
                }
              />
              <input
                type='number'
                className='w-1/2 p-2 border rounded-lg'
                placeholder='Y'
                value={topPosition.y}
                onChange={(e) =>
                  handlePositionChange('top', 'y', parseFloat(e.target.value))
                }
              />
            </div>
            <label className='block mt-2 mb-2 text-gray-600'>Middle Text Position</label>
            <div className='flex space-x-2'>
              <input
                type='number'
                className='w-1/2 p-2 border rounded-lg'
                placeholder='X'
                value={middlePosition.x}
                onChange={(e) =>
                  handlePositionChange('middle', 'x', parseFloat(e.target.value))
                }
              />
              <input
                type='number'
                className='w-1/2 p-2 border rounded-lg'
                placeholder='Y'
                value={middlePosition.y}
                onChange={(e) =>
                  handlePositionChange('middle', 'y', parseFloat(e.target.value))
                }
              />
            </div>
            <label className='block mt-2 mb-2 text-gray-600'>Bottom Text Position</label>
            <div className='flex space-x-2'>
              <input
                type='number'
                className='w-1/2 p-2 border rounded-lg'
                placeholder='X'
                value={bottomPosition.x}
                onChange={(e) =>
                  handlePositionChange('bottom', 'x', parseFloat(e.target.value))
                }
              />
              <input
                type='number'
                className='w-1/2 p-2 border rounded-lg'
                placeholder='Y'
                value={bottomPosition.y}
                onChange={(e) =>
                  handlePositionChange('bottom', 'y', parseFloat(e.target.value))
                }
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            className='mt-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
          >
            Download
          </button>
          {/* <p>R.C. PATEL INSTITUTE od technology, shipur</p> */}
        </div>
        <div className=' w-full pt-2 md:w-1/2 flex items-center justify-center'>
          {image || imageUrl ? (
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className='border rounded-lg w-[100%]'
            ></canvas>
          ) : (
            <p className='text-gray-600'>No image selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Custom;
