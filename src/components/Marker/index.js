import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import { AuthConsumer } from '../../contexts/AuthContext';
import { deleteFieldApi } from '../../api/fields';
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
  const [isOpen, setIsOpen] = useState(true);

  const handleDelete = async () => {
    try {
      await deleteFieldApi(id);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) {
    return null;
  }

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
                    <Button variant='contained' color='primary' onClick={handleDelete}>
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
  );
};

export default withStyles(() => ({}))(CustomMarker);
