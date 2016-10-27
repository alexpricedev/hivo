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
      evt.preventDefault();
      dispatch(addDailyEntry());
    },
    onChange: (evt) => {
      dispatch(updateDailyEntryValue(evt.target));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDailyEntry);
