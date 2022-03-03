import axios from 'axios';
import Track1 from '../gpx/via-glaralpina-11.gpx';
import Track2 from '../gpx/via-glaralpina-12.gpx';
import Track3 from '../gpx/via-glaralpina-13.gpx';
import Track4 from '../gpx/via-alpina-green-complete.gpx';

axios.get(Track1, {
  "Content-Type": "application/xml; charset=utf-8"
})
.then((response) => {
  db.push(response.data);
  // console.log('Your xml file as string', response.data);
});

axios.get(Track2, {
  "Content-Type": "application/xml; charset=utf-8"
})
.then((response) => {
  db.push(response.data);
  // console.log('Your xml file as string', response.data);
});

axios.get(Track3, {
  "Content-Type": "application/xml; charset=utf-8"
})
.then((response) => {
  db.push(response.data);
  // console.log('Your xml file as string', response.data);
});

axios.get(Track4, {
  "Content-Type": "application/xml; charset=utf-8"
})
.then((response) => {
  db.push(response.data);
  // console.log('Your xml file as string', response.data);
});

export const db = [];