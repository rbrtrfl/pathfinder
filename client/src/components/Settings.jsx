import React, { useContext } from 'react';
import { MyContext } from '../helpers/Context';

function Settings() {
  const { setSettings } = useContext(MyContext);
  return (
    <div>
      <ul>
        <li className="mytracks-item">
          <h2>Settings</h2>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <div className="settings-item">
            <span className="bold">Hiking Start: </span>
            <input type="time" value="07:00" />
          </div>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <div className="settings-item">
            <span className="bold">Hiking End: </span>
            <input type="time" value="22:00" />
          </div>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <div className="settings-item">
            <span className="bold">Break Time: </span>
            <input type="number" placeholder="20" />
            <span> %</span>
          </div>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <h2>Simulate</h2>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <div className="settings-item">
            <span className="bold">Location: </span>
            <button>⦿</button>
            <span> click to set location</span>
          </div>
        </li>
        <div className="mytracks-divider" />
        <li className="mytracks-item">
          <div className="settings-item">
            <span className="bold">Time: </span>
            <input type="time" value="07:00" />
          </div>
        </li>
        <div className="mytracks-divider" />
      </ul>
    </div>
  );
}

export default Settings;
