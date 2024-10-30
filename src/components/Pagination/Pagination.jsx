// Pagination.js
import React from 'react';

import "../../sass/pagination/pagination.scss"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Precedente
      </button>
      <span>
        Pagina {currentPage} di {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Successivo
      </button>
    </div>
  );
};

export default Pagination;
