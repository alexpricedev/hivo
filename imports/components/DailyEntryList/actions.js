const changePage = function(currentPageNumber) {
  return {
    type: 'CHANGE_PAGE',
    currentPageNumber
  };
};

export { changePage }
