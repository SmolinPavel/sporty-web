import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import stadiumIcon from '../CustomIcons/Stadium';

export const pointerIcon = new L.Icon({
  iconUrl: require('../../assets/pointerIcon.svg'),
  iconRetinaUrl: require('../../assets/pointerIcon.svg'),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../../assets/pointerIcon.svg',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92]
});

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
  <Marker position={[lat, long]} key={id} icon={stadiumIcon}>
    <Popup>
      <>
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
      </>
    </Popup>
  </Marker>
);

export default CustomMarker;
