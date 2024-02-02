import React, { useEffect, useState, useRef } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import data from './Meme';

function Body({ selected, setSelected, memeId, setMemeId, clearInput, setSearchSection }) {
  const [memes, setMemes] = useState([]);
  const [top_text, setTop_text] = useState('');
  const [bottom_text, setBottom_text] = useState('');
  const [EditedMeme, setEditedMeme] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('png'); // Default format is PNG
  const topRef = useRef(null);

  useEffect(() => {
    setSearchSection(true);
  }, []);

  useEffect(() => {
    async function fetchMemes() {
      let arr = [];
      for (let i = 0; i < 50; i++) {
        arr[i] = data[i];
      }
      setMemes(arr);
    }
    fetchMemes();
  }, []);

  useEffect(() => {
    FetchEditedMeme();
  }, [top_text, bottom_text, memeId]);

  const FormEdit = () => {
    setTop_text(document.getElementById('top').value);
    setBottom_text(document.getElementById('bottom').value);
    FetchEditedMeme();
  };

  const FetchEditedMeme = async () => {
    if (memeId !== undefined && memeId.trim() !== '') {
      let url = `https://api.memegen.link/images/${memeId}`;

      if (top_text !== 'empty') {
        if (top_text !== '') url += `/${top_text}`;
      }
      if (bottom_text !== 'empty') {
        if ((top_text === 'empty' || top_text === '') && bottom_text !== '')
          url += `/_/${bottom_text}`;
        else if (bottom_text !== '') url += `/${bottom_text}`;
      }

      url += `.${selectedFormat}`;

      setEditedMeme(url);
    } else {
      console.log('memeId is empty or undefined');
    }
  };

  const loadMoreMemes = () => {
    const currentLength = memes.length;
    if (currentLength >= data.length) {
      alert('Memes not Available to fetch! Sorry');
      return;
    }
    const additionalMemes = data.slice(currentLength, currentLength + 4);
    setMemes([...memes, ...additionalMemes]);
  };

  const downloadImage = async () => {
    if (EditedMeme) {
      try {
        const response = await fetch(EditedMeme);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = `edited-meme.${selectedFormat}`;

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);

        // Revoke the object URL to free up resources
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    } else {
      console.error('EditedMeme URL is empty');
    }
  };

  const ShareButtons = ({ memeUrl }) => (
    <div className="flex space-x-4">
      {memeUrl && (
        <>
          <FacebookShareButton url={memeUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={memeUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton url={memeUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </>
      )}
    </div>
  );


  return (
    <div className='Body pt-20  relative h-[100%] min-h-screen'>
      <div>
        <ShareButtons memeUrl={EditedMeme} />
      </div>
      
      <div className="top grid grid-cols-1 md:grid-cols-2 " ref={topRef}>
        <div className="left flex flex-col h-[400px] justify-center items-center md:flex-row">
          <div className="image max-w-[60%] md:max-w-[50%]  h-[50%] md:h-[80%] mr-4 p-2">
            <img src={selected} alt="" className='h-full' />
          </div>
          <div className="form flex flex-col justify-center ">
            <div className="title mb-10 text-4xl text-black">Edit the MEME</div>
            <input type="text" className='p-2 rounded-md mb-4' id="top" placeholder="Top Text" />
            <input type="text" className='p-2 rounded-md mb-4' id="bottom" placeholder="Bottom Text" />
            <button type="button" onClick={FormEdit} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md'>Submit</button>
          </div>
        </div>
        <div className="right flex flex-col justify-center items-center">
          <h2 className='text-2xl pt-4'>Preview of the Edited MEME</h2>
          <div className="image max-w-[60%] max-h-[300px] mr-4 flex mt-8 mb-4 ">
            <img src={EditedMeme} alt='select below memes or go to custom edit' className='h-full' />
          </div>
          <div>
            <select
              onChange={(e) => {
                try {
                  setEditedMeme(EditedMeme.slice(0, -3) + e.target.value);
                  setSelectedFormat(e.target.value);
                } catch (err) {
                  alert('please select a template!');
                }
              }}
              className="p-2 rounded-md mb-4"
            >
              <option value="png">PNG</option>
              <option value="gif">GIF</option>
            </select>

            <button
              onClick={downloadImage}
              className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md"
            >
              Download {selectedFormat.toUpperCase()} Image
            </button>
          </div>
        </div>
      </div>
      <h1 className='md:text-4xl text-xl pt-4 flex items-center justify-center'>Select a MEME Template</h1>
      <div className="bottom grid grid-cols-2 md:grid-cols-4 mx-4 my-[20%] gap-6">
        {memes.map(({ id, blank, example }) => (
          <div key={id} className="card flex-col justify-center items-center w-full md:max-w-[70%] mx-auto">
            <img src={example.url} alt={`meme-${id}`} />
            <button
              className='bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white py-2 px-4 rounded-md mt-2'
              onClick={() => {
                setSelected(blank);
                setMemeId(id);
                clearInput();
                topRef.current.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <button
        className="bg-blue-900 p-1 rounded-md text-white mx-auto absolute -bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onClick={loadMoreMemes}
        disabled={memes.length >= data.length - 4}
      >
        Add More
      </button>
    </div>
  );
}

export default Body;
