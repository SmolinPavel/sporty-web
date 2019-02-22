import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const position = [53.891, 27.601];

const CustomMap = () => {
  const [fields, setFields] = useState([]);

  async function fetchFields() {
    console.log('test');
    const response = await fetch(
      'https://sporty-brosky.herokuapp.com/api/1.0/fields'
    );
    const fields = await response.json();
    setFields(fields);
  }

  useEffect(() => {
    fetchFields();
  }, []);

  console.log('fields', fields);

  return (
    <Map center={position} zoom={9} style={{ height: '100vh', width: '100%' }} zoomControl>
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
