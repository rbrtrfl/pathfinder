import React from 'react'

function MyTracksItem( { item } ) {
  return (
    <div className='mytracks-item'>
      Track, Item: {item.name}
    </div>
  )
}

export default MyTracksItem