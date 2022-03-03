import React from 'react'
import MyTracksItem from './MyTracksItem'

function MyTracks() {

  const mockdata = [
    {
      name: 'Tack 1',
      id: '1'
    },
    {
      name: 'Tack 2',
      id: '2'
    },
    {
      name: 'Tack 3',
      id: '3'
    },
  ]

  return (
    <div>MyTracks
      <ul className='mytracks-list'>
          {mockdata.map((item) => {
            return (
              <li>
                <MyTracksItem
                  key={item.id}
                  item={item}
                />
              </li>
            );
          })}
      </ul>
    </div>
  )
}

export default MyTracks