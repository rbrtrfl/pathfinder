import React from 'react'

function FileUploadForm() {

  function clickHandler() {
    
  }

  return (
    <div>FileUploadForm
      <form onClick={clickHandler()}>
        <input type="file"></input>
        <button>UPLOAD</button>
      </form>
    </div>
  )
}

export default FileUploadForm