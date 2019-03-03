import React from 'react';

import ball from '../../assets/ball.svg';
import s from './styles.module.scss';

const FromLoadingIcon = ({ loading, defaultIcon }) => (
  <>
    {loading ? (
      <div className={s.ballWrapper}>
        <img src={ball} className={s.ball} alt='loading ball' />
      </div>
    ) : (
        defaultIcon
    )}
  </>
);

export default FromLoadingIcon;