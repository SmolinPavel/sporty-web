import React, { useEffect, useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Loader from '../Loader';
import Marker from '../Marker';

import { getPosition } from '../../helpers';

import 'react-leaflet-markercluster/dist/styles.min.css';

import {
  API_GET_FIELDS,
  DEFAULT_LOCATION,
  DEFAULT_ZOOM
} from '../../constants';

const CustomMap = () => {
  const [center, setCenter] = useState(DEFAULT_LOCATION);
  const [fields, setFields] = useState([]);

  async function fetchFields() {
    const response = await fetch(API_GET_FIELDS);
    const fields = await response.json();
    setFields(fields);
  }

  async function getCurrentLocation() {
    const position = await getPosition();
    const { coords: { latitude, longitude } = {} } = position;
    setCenter([latitude, longitude]);
  }

  useEffect(() => {
    getCurrentLocation();
  }, ['center']);

  useEffect(() => {
    fetchFields();
  }, ['fields']);

  if (fields.length === 0) {
    return <Loader text='💩 Loading...' />;
  }

  return (
    <Map
      center={center}
      style={{ height: '100vh', width: '100%' }}
      zoom={DEFAULT_ZOOM}>
      <ZoomControl position='bottomright' />

      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
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
