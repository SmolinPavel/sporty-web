import React, { useEffect, useState } from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Marker from '../Marker';
import Loader from '../Loader';
import { getPosition } from '../../helpers';

import {
  API_GET_FIELDS,
  DEFAULT_LOCATION,
  DEFAULT_ZOOM
} from '../../constants';

import 'react-leaflet-markercluster/dist/styles.min.css';

const CustomMap = ({ height = '100vh', newField, onClick = () => {}, showLoading = false }) => {
  const [center, setCenter] = useState(DEFAULT_LOCATION);
  const [fields, setFields] = useState([]);

  async function fetchFields() {
    const response = await fetch(API_GET_FIELDS);
    const fields = await response.json();
    const newFields = newField ? [...fields, newField] : fields;
    setFields(newFields);
  }

  async function getCurrentLocation() {
    const position = await getPosition();
    const { coords: { latitude, longitude } = {} } = position;
    setCenter([latitude, longitude]);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    fetchFields();
  }, [newField])

  if (fields.length === 0 && showLoading) {
    return <Loader text='⛹🏻‍♂️ Loading...' />;
  }

  return (
    <Map
      center={center}
      style={{ height, width: '100%' }}
      zoom={DEFAULT_ZOOM}
      zoomControl={false}
      onClick={onClick}>
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
