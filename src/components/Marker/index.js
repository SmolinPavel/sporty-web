import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { formatDate } from '../../helpers';

const CustomMarker = ({
  field: {
    address,
    date,
    description,
    name,
    location: { lat, long } = {},
    info: { phones, photos, url } = {},
    type,
    _id: id,
    user: { name: userName } = {}
  } = {}
}) => (
  <Marker position={[lat, long]} key={id}>
    <Popup>
      <>
        <h2>
          <span role='img' aria-label='footbal emoji'>
            🥅
          </span>{' '}
          {name}
        </h2>
        <ul>
          {address && <li>Address: {address}</li>}
          <li>Field type: {type}</li>
          <li>Created By: {userName}</li>
          <li>Created At: {formatDate(new Date(date))}</li>
          {description && <li>Description: {description}</li>}
          {phones.length > 0 && (
            <li>
              Phones:
              <ul>
                {phones.map((phone, idx) => (
                  <li key={`${idx}-${phone}`}>
                    <a href={`tel:${phone}`}>{phone}</a>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {photos.length > 0 && (
            <li>
              Photos:
              <ul>
                {photos.map((photo, idx) => (
                  <li key={`${idx}-${photo}`}>
                    <img src={photo} width='80' alt={`field-${idx}`} />
                  </li>
                ))}
              </ul>
            </li>
          )}
          {url && (
            <li>
              <a href={url} target='_blank' rel='noopener noreferrer'>
                {url}
              </a>
            </li>
          )}
        </ul>
      </>
    </Popup>
  </Marker>
);

export default CustomMarker;
