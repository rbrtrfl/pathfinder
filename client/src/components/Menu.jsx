import React from 'react'
import './Menu.css'

function Menu( { menuItem, setMenuItem }) {
  return (
    <nav>
      <div
        className={menuItem === 'map' ? 'selected' : ''}
        onClick={() => setMenuItem('map')}
      >➤</div>
      <div
        className={menuItem === 'mytracks' ? 'selected' : ''}
        onClick={() => setMenuItem('mytracks')}
      >••</div>
      <div
        className={menuItem === 'enroute' ? 'selected' : ''}
        onClick={() => setMenuItem('enroute')}
      >☡</div>
      <div
        className={menuItem === 'drawroute' ? 'selected' : ''}
        onClick={() => setMenuItem('drawroute')}
      >✎</div>
      <div
        className={menuItem === 'settings' ? 'selected' : ''}
        onClick={() => setMenuItem('settings')}
      >⌂</div>
    </nav>
  )
}

export default Menu