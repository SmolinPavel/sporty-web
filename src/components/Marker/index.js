import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const CustomMarker = ({
  field: {
    date,
    name,
    type,
    _id: id,
    location: { lat, long } = {},
    user: { name: userName } = {}
  } = {}
}) => (
  <Marker position={[lat, long]} key={id}>
    <Popup>
      <h2>
        <span role='img' aria-label='footbal emoji'>
          🥅
        </span>{' '}
        {name}
      </h2>
      <ul>
        <li>Field id: {id}</li>
        <li>Field type: {type}</li>
        <li>
          Location: {lat}/{long}
        </li>
        <li>Created By: {userName}</li>
        <li>Created At: {date}</li>
      </ul>
    </Popup>
  </Marker>
);

export default CustomMarker;
