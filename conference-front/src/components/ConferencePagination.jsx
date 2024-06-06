import React from "react";

const ConferencePagination = ({
  conferencesPerPage,
  totalConferences,
  currentPage,
  setCurrentPage,
}) => {
  const maxVisiblePages = 5; // Maximum number of visible pages
  const totalPages = Math.ceil(totalConferences / conferencesPerPage);
  let pages = [];

  // Determine the range of pages to display
  let startPage, endPage;
  if (totalPages <= maxVisiblePages) {
    // Show all pages if the total number is less than or equal to the maximum visible pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculate start and end pages with ellipsis
    const maxVisibleBeforeEllipsis = Math.floor((maxVisiblePages - 1) / 2);
    const maxVisibleAfterEllipsis = Math.ceil((maxVisiblePages - 1) / 2) - 1;
    if (currentPage <= maxVisibleBeforeEllipsis) {
      startPage = 1;
      endPage = maxVisiblePages - 1;
    } else if (currentPage >= totalPages - maxVisibleAfterEllipsis) {
      startPage = totalPages - maxVisiblePages + 2;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxVisibleBeforeEllipsis + 1;
      endPage = currentPage + maxVisibleAfterEllipsis;
    }
  }

  // Create the array of page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center">
      {startPage > 1 && (
        <button
          onClick={() => setCurrentPage(1)}
          className="border rounded-lg px-4 py-2 mx-1 mb-4 bg-gray-200"
        >
          1
        </button>
      )}
      {startPage > 2 && (
        <span className="border rounded-lg px-4 py-2 mx-1 mb-4 bg-gray-200">
          ...
        </span>
      )}
      {pages.map((page, index) => (
        <button
          onClick={() => setCurrentPage(page)}
          className={`border rounded-lg px-4 py-2 mx-1 mb-4 ${
            page === currentPage ? "bg-lime-600 text-white" : "bg-gray-200"
          }`}
          key={index}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages - 1 && (
        <span className="border rounded-lg px-4 py-2 mx-1 mb-4 bg-gray-200">
          ...
        </span>
      )}
      {endPage < totalPages && (
        <button
          onClick={() => setCurrentPage(totalPages)}
          className="border rounded-lg px-4 py-2 mx-1 mb-4 bg-gray-200"
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default ConferencePagination;
