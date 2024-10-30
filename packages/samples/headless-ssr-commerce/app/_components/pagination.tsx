'use client';

import {usePagination} from '../_lib/commerce-engine';

export default function Pagination() {
  const {state, controller} = usePagination();

  const renderPageRadioButtons = () => {
    return Array.from({length: state.totalPages}, (_, i) => {
      const page = i + 1;
      return (
        <label className="SelectPage" key={page}>
          <input
            type="radio"
            name="page"
            value={page - 1}
            checked={state.page === page - 1}
            onChange={() => controller?.selectPage(page - 1)}
          />
          {page}
        </label>
      );
    });
  };

  return (
    <div className="Pagination">
      <div>
        Page {state.page + 1} of {state.totalPages}
      </div>
      <button
        className="PreviousPage"
        disabled={state.page === 0}
        onClick={controller?.previousPage}
      >
        {'<'}
      </button>
      {renderPageRadioButtons()}
      <button
        className="NextPage"
        disabled={state.page === state.totalPages - 1}
        onClick={controller?.nextPage}
      >
        {'>'}
      </button>
    </div>
  );
}
