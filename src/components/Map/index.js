import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';

import {
  API_GET_FIELDS,
  DEFAULT_LOCATION,
  DEFAULT_ZOOM
} from '../../constants';

const CustomMap = () => {
  const [fields, setFields] = useState([]);

  async function fetchFields() {
    const response = await fetch(API_GET_FIELDS);
    const fields = await response.json();
    setFields(fields);
  }

  useEffect(() => {
    fetchFields();
  }, []);

  console.log('fields', fields);

  return (
    <Map
      center={DEFAULT_LOCATION}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100vh', width: '100%' }}>
      <ZoomControl position='bottomright' />

      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {fields.map(
        ({
          date,
          name,
          type,
          _id: id,
          location: { lat, long } = {},
          user: { name: userName } = {}
        }) => {
          return (
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
        }
      )}
    </Map>
  );
};

export default CustomMap;
