import React, { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import Menu from './components/Menu';

console.clear();

function App() {
  const [menuItem, setMenuItem] = useState('map');

  return (
    <div className="app-container">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin=""
      />
      <div className="main-container">
        <MainContainer
          menuItem={menuItem}
          setMenuItem={setMenuItem}
        />
      </div>
      <div className="menu-component">
        <Menu
          menuItem={menuItem}
          setMenuItem={setMenuItem}
        />
      </div>
    </div>
  );
}

export default App;
