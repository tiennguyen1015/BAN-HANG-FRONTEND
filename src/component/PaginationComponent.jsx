import React from 'react'

const PaginationComponent = ({
    page,
    totalPages,
    setPage,
    visiblePages = 5
}) => {
		// const visiblePages = 5;
		// const [page, setPage] = useState(0);
		// const [totalPages, setTotalPages] = useState(0);
	const currentGroup = Math.floor(page / visiblePages);
	const startPage = currentGroup * visiblePages;
	const endPage = Math.min(startPage + visiblePages, totalPages);

  return (
	<div className="pagination">
	{Array.from(
		{ length: endPage - startPage },
		(_, i) => startPage + i
	).map((p) => (
		<button
			key={p}
			className={page === p ? "active" : ""}
			onClick={() => setPage(p)}
		>
			{p + 1}
		</button>
	))}
	<button
		disabled={endPage >= totalPages}
		onClick={() => setPage(endPage)}
	>
		&raquo;
	</button>
</div>

  )
}

export default PaginationComponent