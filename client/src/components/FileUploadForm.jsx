import React from 'react';
import { postTrack } from '../services/ApiService';

function FileUploadForm() {
  function clickHandler(event) {
    event.preventDefault();
    const file = document.getElementById('input').files[0];
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.addEventListener('loadend', (data) => {
      postTrack(data.currentTarget.result);
    });
  // TODO: form reset
  }
  // TODO: form validation
  return (
    <div>
      FileUploadForm
      <form onSubmit={clickHandler}>
        <input type="file" id="input" />
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  );
}

export default FileUploadForm;
