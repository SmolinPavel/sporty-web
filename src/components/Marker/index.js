import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import { AuthConsumer } from '../../contexts/AuthContext';
import { formatDate } from '../../helpers';

const CustomMarker = ({
  field: {
    address,
    date,
    description,
    name,
    location: { lat, long } = {},
    info: { phones = [], photos = [], url } = {},
    type,
    _id: id,
    user: { name: userName, _id: creatorId } = {}
  } = {}
}) => {

  const handleDelete = async () => {
    // try {
    //   const res = await registerApi();
    // } catch (err) {
    //   console.log(err);
    // }
  };

return (
  <AuthConsumer>
    {({ userId }) => (
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

              {userId === creatorId && (
                <>
                  <br />
                  <Button variant='contained' color='primary'>
                    delete
                  </Button>
                </>
              )}
            </ul>
          </>
        </Popup>
      </Marker>
    )}
  </AuthConsumer>
)};

export default withStyles(() => ({}))(CustomMarker);
