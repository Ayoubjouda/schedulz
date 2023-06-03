import React from 'react';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  nextPage,
  previousPage,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="inline-flex items-center">
      <li
        onClick={previousPage}
        className="px-3 py-1 rounded-md cursor-pointer focus:outline-none focus:shadow-outline-purpler"
      >
        Prev
      </li>
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={`px-3 py-1 rounded-md cursor-pointer focus:outline-none focus:shadow-outline-purpler ${
            number === currentPage ? 'bg-emerald-700 text-white' : ''
          }`}
        >
          {number}
        </li>
      ))}
      <li
        onClick={nextPage}
        className="px-3 py-1 rounded-md cursor-pointer focus:outline-none focus:shadow-outline-purpler"
      >
        Next
      </li>
    </ul>
  );
};

export default Pagination;
