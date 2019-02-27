import React from 'react';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Marker from '../Marker';
import { DEFAULT_ZOOM } from '../../constants';

import 'react-leaflet-markercluster/dist/styles.min.css';

const CustomMap = ({ center, fields }) => (
  <Map
    center={center}
    style={{ height: 'calc(100vh - 64px)', width: '100%' }}
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

export default CustomMap;
