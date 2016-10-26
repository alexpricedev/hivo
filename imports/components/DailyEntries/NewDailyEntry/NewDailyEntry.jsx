import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';
import { addDailyEntry } from '../actions';

const AddDailyEntry = ({ dispatch }) => {
  return (
    <form className={styles.form} onSubmit={e => {
      e.preventDefault();
      const entry = {
        timeOfDay: e.target.timeOfDay.value,
        text: e.target.text.value,
        mood: e.target.mood.value,
      };
      dispatch(addDailyEntry(entry));
    }}>

      <select className={styles.select} name="timeOfDay">
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>

      <textarea className={styles.textarea} id="text" name="text" />

      <input
        className={styles.range}
        type="range"
        id="mood"
        name="mood"
        min="0"
        max="10"
      />

      <button className={styles.button} type="submit">
        Add Daily Entry
      </button>

    </form>
  );
};

export default connect()(AddDailyEntry);
