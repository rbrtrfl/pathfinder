import React from 'react'
import './Menu.css'

function Menu( { setMenuItem }) {
  return (
    <nav>
      <div onClick={() => setMenuItem('map')}>➤</div>
      <div onClick={() => setMenuItem('mytracks')}>⌸</div>
      <div onClick={() => setMenuItem('enroute')}>☡</div>
      <div onClick={() => setMenuItem('drawroute')}>✎</div>
      <div onClick={() => setMenuItem('settings')}>⌂</div>
    </nav>
  )
}

export default Menu