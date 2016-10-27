import React from 'react';

import styles from './styles.css';

const NewDailyEntry = ({ onSubmit, onChange, form }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>

      <label htmlFor="timeOfDay">
        What time of day is it?
      </label>

      <select
        value={form.timeOfDay}
        onChange={onChange}
        className={styles.select}
        name="timeOfDay"
      >
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
      </select>

      <label htmlFor="text">
        Daily entry text
      </label>

      <textarea
        value={form.text}
        onChange={onChange}
        className={styles.textarea}
        id="text"
        name="text"
        placeholder="Please enter some text"
      />

      <label htmlFor="mood">
        Current mood: {form.mood}
      </label>

      <input
        value={form.mood}
        onChange={onChange}
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

export default NewDailyEntry;
