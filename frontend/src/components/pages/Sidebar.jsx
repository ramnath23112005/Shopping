import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-logo">🎵 MyMusic</div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">Home</li>
          <li>Search</li>
          <li>Library</li>
          <li>Playlists</li>
          <li>Liked Songs</li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <button className="upgrade-btn">Upgrade</button>
      </div>
    </aside>
  );
};

export default Sidebar;
