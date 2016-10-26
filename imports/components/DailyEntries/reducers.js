const PER_PAGE_SKIP = 10

const pageSkip = function(state = 0, action = {}) {
  switch (action.type) {
    case 'CHANGE_PAGE':
      // take the currentPageNumber from the payload
      return action.currentPageNumber * PER_PAGE_SKIP;
    default:
      return state;
  }
};

const updateRange = function(state = 5, action = {}) {
  switch (action.type) {
    case 'UPDATE_RANGE':
      return action.value;
    default:
      return state;
  }
};

export { pageSkip, updateRange };
