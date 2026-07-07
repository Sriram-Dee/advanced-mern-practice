const Pagination = ({ pages, currentPage, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      {Array.from({ length: pages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg transition ${
              page === currentPage
                ? "bg-zinc-900 text-white cursor-default"
                : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;