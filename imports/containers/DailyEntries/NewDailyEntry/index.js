import React from 'react';
import { connect } from 'react-redux';

import NewDailyEntry from '../../../components/DailyEntries/NewDailyEntry';
import { addDailyEntry, updateDailyEntryValue } from '../actions';

function mapStateToProps(state) {
  return {
    form: {
      timeOfDay: state.newDailyEntryForm.timeOfDay,
      text: state.newDailyEntryForm.text,
      mood: state.newDailyEntryForm.mood
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (evt) => {
      dispatch(addDailyEntry({
        timeOfDay: evt.target.timeOfDay.value,
        text: evt.target.text.value,
        mood: evt.target.mood.value,
      }));
    },
    onChange: (evt) => {
      dispatch(updateDailyEntryValue(evt.target));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDailyEntry);
