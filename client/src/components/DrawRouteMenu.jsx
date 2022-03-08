import React from 'react';

function DrawRouteMenu() {
  return (
    <div>

      <div className="save-form" id="menu-overlay">
        <form>
          <input />
          <button
            className="selected"
            type="button"
            onClick={() => console.log('click')}
          >
            ✓
          </button>
        </form>
      </div>

    </div>
  );
}

export default DrawRouteMenu;
