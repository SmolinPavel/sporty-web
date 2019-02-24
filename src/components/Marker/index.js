import React from 'react';
import { Marker, Popup } from 'react-leaflet';

import { formatDate } from '../../helpers';
import stadiumIcon from '../CustomIcons/Stadium';

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
          {/* <li>Field id: {id}</li> */}
          {address && <li>Address: {address}</li>}
          <li>Field type: {type}</li>
          {/* <li>
            Location: {lat}/{long}
          </li> */}
          <li>Created By: {userName}</li>
          <li>Created At: {formatDate(new Date(date))}</li>
          {description && <li>Description: {description}</li>}
          {phones.length > 0 && (
            <li>
              Phones:
              <ul>
                {phones.map(phone => (
                  <li>
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
                  <li>
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
