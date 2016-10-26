import React from 'react';
import ReactPaginate from 'react-paginate';

const DailyEntryListPagination = ({ handlePageClick, pageCount }) => (
  <div className="paginate">
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={<li className="break"><a href="">...</a></li>}
      pageNum={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      clickCallback={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
    />
  </div>
);

export default DailyEntryListPagination;
