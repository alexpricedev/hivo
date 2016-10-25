import React from 'react';
import moment from 'moment';

const DailyEntry = ({timeOfDay, text, mood, createdAt}) => (
  <li>
    Time of day: {timeOfDay} <br />
    Text: {text} <br />
    Mood: {mood} <br />
    Created on: {moment(createdAt).format('dddd, MMMM Do, h:mm a')}
    <hr />
  </li>
);

export default DailyEntry;
