import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { listCaregory,deleteCategory } from '../../services/CategoryService';

const ListCategoriesComponent = () => {
	const [categorys, setCategorys] = useState([]);
	const navigate= useNavigate();  

	const [keyword, setKeyword] = useState("");
	const [searchKeyword, setSearchKeyword] = useState("");
	
	const[totalPages,setTotalPages]= useState(0);
	const [page, setPage] = useState(0);
	const visiblePages = 5;
	const currentGroup = Math.floor(page / visiblePages);
	const startPage = currentGroup * visiblePages;
	const endPage = Math.min(startPage + visiblePages, totalPages);

	const getCategory=()=>{
		const token= localStorage.getItem("token");
		if(!token){
			navigate("/login");
			return;
		}
		listCaregory(searchKeyword,page,5).then((res)=>{
			setCategorys(res.data.data.content);
			setTotalPages(res.data.data.totalPages);
		}).catch(error=>{
			if(error.repones){
				if (error.response.status === 401) {
					localStorage.removeItem("token");
					window.location.href = "/login";
				}
				if (error.response.status === 403) {
					alert("Bạn không có quyền truy cập!");
					return;
				}
				return Promise.reject(error);
			}
		})
	}

	useEffect(()=>{
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login");
				return;
			}
			getCategory();
		},[page,searchKeyword])

	const addCategory=()=>{
		navigate('/categorys/Create');
	}

	const editCatgory =(id)=>{
		console.log("ID truyền đi:", id);
		navigate(`/categorys/Edit/${id}`);
	}

	const hanlDeleteCatgory=(id)=>{
		if(!window.confirm("bạn có chắc muốn xóa không")){
			return;
		}
		deleteCategory(id).then((res)=>{
			alert(res.data.message);
			setCategorys(prev=>prev.filter(categorys=>categorys.id!==id))
		 }).catch(error=>{
			// alert(error.response?.data?.message || "Xóa thất bại. Danh mục đang tồn tại sản phẩm");
			alert( "Xóa thất bại. Danh mục đang tồn tại sản phẩm");
		 })
	}



  return (
	<div className='container'>
		<h2 className='text-center'>danh sách danh mục</h2>
		<div className="d-flex justify-content-between align-items-center my-3">
			<button onClick={addCategory} className="btn btn-primary w-auto">
				Thêm danh mục
			</button>

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

		<table className='table table-striped  table-hover table-bordered'>
			<thead>
				<tr>
					<th>id</th>
					<th>tên</th>
					<th>mô tả</th>
					<th>chức năng</th>
				</tr>
			</thead>
			<tbody>
				{
					categorys.map(category=>
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>{category.description}</td>
							<td>
							<div className="btn-group" role="group" aria-label="Basic mixed styles example">
							<button type="button" onClick={()=>editCatgory(category.id)} className="btn btn-success">edit</button>
							<button type="button" onClick={()=>hanlDeleteCatgory(category.id)}  className="btn btn-danger">xóa</button>
							</div>
							</td>
						</tr>
					)
				}
			</tbody>
		</table>

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

	</div>
  )
}

export default ListCategoriesComponent