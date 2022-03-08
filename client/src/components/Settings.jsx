import React, { useContext } from 'react';
import { TracksContext } from '../contexts/Contexts';

function Settings() {
  const { setSettings } = useContext(TracksContext);
  return (
    <div>
      <ul>
        <form>

          <li className="mytracks-item">
            <h2>Settings</h2>
          </li>
          <div className="mytracks-divider" />
          <li className="mytracks-item">
            <span className="bold settings-item">Hiking Start:</span>
            <div className="settings-item center">
              <input type="time" defaultValue="07:00" />
            </div>
            <span className="settings-item" />
          </li>
          <div className="mytracks-divider" />

          <li className="mytracks-item">
            <span className="bold settings-item">Hiking End:</span>
            <div className="settings-item center">
              <input type="time" defaultValue="22:00" />
            </div>
            <span className="settings-item" />
          </li>
          <div className="mytracks-divider" />
          <li className="mytracks-item">
            <span className="bold settings-item">Break Time:</span>
            <div className="settings-item center">
              <input type="number" defaultValue="20" min="0" max="100" />
            </div>
            <span className="settings-item"> %</span>
          </li>
          <div className="mytracks-divider" />

          <li className="mytracks-item">
            <h2>Simulate</h2>
          </li>
          <div className="mytracks-divider" />
          <li className="mytracks-item">
            <span className="bold settings-item">Location: </span>
            <div className="settings-item center">
              <button type="button">⦿</button>
            </div>
            <span className="settings-item">click to set location</span>
          </li>
          <div className="mytracks-divider" />

          <li className="mytracks-item">
            <div className="bold settings-item">Time: </div>
            <div className="settings-item center">
              <input type="time" defaultValue="18:00" />
            </div>
            <div className="settings-item" />
          </li>
          <div className="mytracks-divider" />

        </form>
      </ul>
    </div>
  );
}

export default Settings;
