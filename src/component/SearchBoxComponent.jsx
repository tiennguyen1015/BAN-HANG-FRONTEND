import React from 'react'



const SearchBoxComponent = (
	{
	keyword,
	setKeyword,
	onSearch,
	onAdd,
	placeholder = "Nhập tên hoặc email...",
	showAddButton = true,
  	}
) => {
	return (
	<div>
		<div className="d-flex justify-content-between align-items-center my-3">
			<div className="d-flex" style={{ width: "600px" }}>
				<input
					type="text"
					className="form-control me-2"
					placeholder="Nhập tên hoặc email..."
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>

				<button className="btn btn-success" style={{ width: "300px" }} 
				onClick={()=>{
					setPage(0);
					setSearchKeyword(keyword);
				}}
				>
					Tìm kiếm
				</button>
			</div>
		</div>
	</div>
  )
}

export default SearchBoxComponent