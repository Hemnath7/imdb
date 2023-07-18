import React, { useState } from "react";

function Pagination(props) {
  const { pageNum, onPrev, onNext } = props;
  return (
    <div className="flex justify-center mt-20 cursor-pointer">
      <div
        onClick={() => onPrev(pageNum - 1)}
        className="border-2 border-r-0 rounded-l-xl px-4 py-2 border-blue-400"
      >
        Previous
      </div>
      <div className="border-2 border-r-0 px-4 py-2 border-blue-400">
        {/* {props.pageNum} */}
        {pageNum}
      </div>
      <div
        onClick={() => {
          onNext(pageNum + 1);
        }}
        className="border-2 rounded-r-xl px-4 py-2 border-blue-400 cursor-pointer"
      >
        Next
      </div>
    </div>
  );
}

export default Pagination;
