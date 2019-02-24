import React, { useEffect, useRef, useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Loader from '../Loader';
import Marker from '../Marker';

import 'react-leaflet-markercluster/dist/styles.min.css';

import {
  API_GET_FIELDS,
  DEFAULT_LOCATION,
  DEFAULT_ZOOM
} from '../../constants';

const CustomMap = () => {
  const mapRef = useRef(null);
  const [fields, setFields] = useState([]);

  async function fetchFields() {
    const response = await fetch(API_GET_FIELDS);
    const fields = await response.json();
    setFields(fields);
  }

  useEffect(() => {
    setTimeout(() => {
      const map = mapRef.current;
      if (map != null) {
        console.log('test', map);
        map.leafletElement.locate();
      }
    }, 5000);
    fetchFields();
  }, ['fields']);

  return (
    <Map
      center={DEFAULT_LOCATION}
      ref={mapRef}
      style={{ height: '100vh', width: '100%' }}
      zoom={DEFAULT_ZOOM}>
      <ZoomControl position='bottomright' />

      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {fields.length === 0 && <Loader text='💩 Loading...' />}
      <MarkerClusterGroup
        spiderLegPolylineOptions={{
          weight: 0,
          opacity: 0
        }}>
        {fields.map(field => (
          <Marker field={field} key={field._id} />
        ))}
      </MarkerClusterGroup>
    </Map>
  );
};

export default CustomMap;
