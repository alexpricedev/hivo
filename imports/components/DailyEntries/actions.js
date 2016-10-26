const addDailyEntry = function(entry) {
  return () => {
    Meteor.call('dailyEntry.insert', entry);
  };
};

const changePage = function(currentPageNumber) {
  return {
    type: 'CHANGE_PAGE',
    currentPageNumber
  };
};

export { addDailyEntry, changePage }
