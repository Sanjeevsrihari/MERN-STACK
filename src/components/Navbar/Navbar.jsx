import React from 'react'
import './Navbar.css'

function Navbar({ searchQuery, handleSearch }) {
  return (
    <div className="navbar">
        <div className="nav-items">
            <div className="brand-mark">N<span>.</span></div>
            <li className="active">Notes</li>
            <li>Archive</li>
            <li>About</li>
        </div>

        <div className="search">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input type="text" aria-label="Search notes" placeholder="Search notes" value={searchQuery} onChange={handleSearch} />
        </div>
    </div>
  )
}

export default Navbar