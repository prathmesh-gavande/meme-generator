import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import homelogo from './meme-generator.png'


function Navbar({ handleSearch, SearchSection }) {
  const [nav, setNav] = useState(false);

  return (<>
    <nav className='h-14 text-xl text-white w-screen bg-blue-600 fixed flex justify-between items-center z-50'>

      <div className="left flex pr-2">
        <div className="logo ml-4 mr-4 flex items-center">
          <img src={homelogo} alt="Meme-Generator" />
          <Link to='/about'><span style={{ fontSize: 25 }}>&#10067;</span></Link>
        </div>
      </div>


      <div className="right flex">
        {!nav && (
          <>
            <div className="home mr-4 hidden md:flex">
              <Link to="/" className='hover:bg-blue-600 bg-blue-700 duration-150 px-2 py-1 rounded-md'>Home</Link>
            </div>
            <div className="edit mr-4 hidden md:flex">
              <Link to="/customedit" className='hover:bg-blue-600 bg-blue-700 duration-150 px-2 py-1 rounded-md'>Custom Edit</Link>
            </div>

            {SearchSection && (
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  id="search-bar"
                  className="hidden md:flex px-2 py-1 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                />
                <button className="hidden md:flex ml-2 mr-6 bg-blue-700 duration-150 text-white py-1 px-3 rounded-md hover:bg-blue-600" onClick={handleSearch}>
                  Search
                </button>
              </>
            )}
          </>
        )}
        <button className='px-2 py-1 mr-4 md:hidden flex' onClick={() => { if (nav) { setNav(false) } else { setNav(true) } }}>MENU</button>
      </div>


    </nav>
    {nav && (<div className="below flex flex-col mt-10 justify-center items-center h-32 bg-blue-600 text-xl text-white z-50 fixed w-screen">
      <div className="home mt-2">
        <Link to="/" className='hover:border-2 px-2 py-1 rounded-md'>Home</Link>
      </div>
      <div className="edit mt-2">
        <Link to="/customedit" className='hover:border-2 px-2 py-1 rounded-md'>Custom Edit</Link>
      </div>
      {SearchSection && (
        <div className="search flex">
          <input
            type="text"
            placeholder="Search..."
            id="search-bar"
            className="mt-2 px-2 py-1 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
          />
          <button className=" ml-2 mr-4 bg-blue-700 text-white py-1 px-3 rounded-md hover:bg-blue-600 " onClick={handleSearch}>
            Search
          </button>

        </div>)}

    </div>)}
  </>
  )
}

export default Navbar