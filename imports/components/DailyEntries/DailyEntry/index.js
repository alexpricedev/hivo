import React from 'react';
import moment from 'moment';

import styles from './styles.css';

const DailyEntry = ({timeOfDay, text, mood, createdAt}) => (
  <div>
    <h4>{moment(createdAt).format('dddd, MMMM Do, h:mm a')}</h4>
    <span
      style={{marginRight: '8px'}}
      className="pt-tag pt-intent-primary"
    >
      {timeOfDay}
    </span>
    <span className="pt-tag pt-round">Mood: {mood} / 10</span>
    <hr />
    {text}
  </div>
);

export default DailyEntry;
