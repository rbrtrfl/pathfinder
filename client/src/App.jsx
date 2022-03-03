import { useState } from 'react';
import './App.css';
import MainContainer from './components/MainContainer';
import Menu from './components/Menu';

function App() {

  const [menuItem, setMenuItem]= useState('map');

  return (
    <div className="app-container">
      <div className='main-container'>
        <MainContainer
          menuItem={menuItem}
        ></MainContainer>
      </div>
      <div className='menu-component'>
        <Menu
          setMenuItem={setMenuItem}
        ></Menu>
      </div>
    </div>
  );
}

export default App;
