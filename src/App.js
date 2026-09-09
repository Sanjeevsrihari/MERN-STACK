import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Pages/Home/Home';

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="App">
      <Navbar searchQuery={searchQuery} handleSearch={handleSearch} />
      <Home searchQuery={searchQuery} />
      <Footer />
    </div>
  );
}

export default App;