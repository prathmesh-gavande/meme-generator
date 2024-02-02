import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import data from './components/Meme';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Custom from './components/Custom';
import About from './components/About';

function App() {
  const [selected, setSelected] = useState();
  const [memeId, setMemeId] = useState();
  const [SearchSection, setSearchSection] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false); // Assuming API call is done
  }, []);

  const handleSearch = () => {
    clearInput();
    const searchTerm = document.getElementById('search-bar').value;
    if (!searchTerm) {
      alert('Search Bar Empty');
      return;
    }

    const sanitizedSearchTerm = searchTerm.replace(/[^\w\s]/gi, '').toLowerCase();

    const searchResult = data.find((item) => {
      const sanitizedMemeName = item.name.replace(/[^\w\s]/gi, '').toLowerCase();
      return sanitizedMemeName.includes(sanitizedSearchTerm);
    });

    if (searchResult) {
      setSelected(searchResult.blank);
      setMemeId(searchResult.id);
      setLoading(true); // Set loading state when making API call
    } else {
      alert('Search result not found');
    }
  };

  const clearInput = () => {
    document.getElementById('top').value = '';
    document.getElementById('bottom').value = '';
  };

  return (
    <>
      <Router>
        <Navbar handleSearch={handleSearch} SearchSection={SearchSection} />
        <Routes>
          <Route
            path="/"
            element={
              <Body
                selected={selected}
                setSelected={setSelected}
                memeId={memeId}
                setMemeId={setMemeId}
                clearInput={clearInput}
                setSearchSection={setSearchSection}
                loading={loading}
              />
            }
          />
          <Route path="/customedit" element={<Custom setSearchSection={setSearchSection} />} />
          <Route path="/About" element={<About setSearchSection={setSearchSection} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
