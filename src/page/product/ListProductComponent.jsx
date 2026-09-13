import React, { useEffect, useState } from 'react'
import { listProducts ,deleteProduct} from '../../services/ProductService';
import { useNavigate } from 'react-router-dom'

const ListProductComponent = () => {
	const [products,setProducts]= useState([]);
	const [keyword, setKeyword] = useState("");
	const [searchKeyword, setSearchKeyword] = useState("");
	const navigate = useNavigate();

	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(0);
	const visiblePages = 5;
	const currentGroup = Math.floor(page / visiblePages);
	const startPage = currentGroup * visiblePages;
	const endPage = Math.min(startPage + visiblePages, totalPages);

	const getProducts=()=>{

		const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

		listProducts(searchKeyword, page, 5).then((res)=>{
			// console.log(res.data.data.content);
			setProducts(res.data.data.content);
			setTotalPages(res.data.data.totalPages);
		}).catch(error=>{
			// console.error(error);
			if (error.response) {
	
				if (error.response.status === 401) {
					localStorage.removeItem("token");
					window.location.href = "/login";
				}
				if (error.response.status === 403) {
					alert("Bạn không có quyền truy cập!");
					return;
				}
			}
			return Promise.reject(error);
		}
		)
	}

	useEffect(()=>{
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
			return;
		}
		getProducts();
	},[page,searchKeyword])


	function addProduct(){
		navigate("/product/Create");
	}

	const editProduct= (id) =>{
		console.log("ID truyền đi:", id);
		navigate(`/products/Edit/${id}`);
	}

	const handleDelete=(id)=>{
		if(!window.confirm("Bạn có chắc muốn xóa không")){
			return;
		}
		deleteProduct(id)
		.then((res=>{
			alert(res.data.message);
			// listProducts();
			setProducts(prev => prev.filter(product => product.id !== id));
		})).catch(error=>{
			alert(error.response?.data?.message || "Xóa thất bại");
		})
	}

	
  return (
	<div className='container'>
		<h2 className='text-center'>Danh sách sản phẩm</h2>
		
		<div className="d-flex justify-content-between align-items-center my-3">
			<button className="btn btn-primary w-auto" onClick={addProduct} >
				Thêm sản phẩm
			</button>
			<div className="d-flex" style={{ width: "600px" }}>
				<input
					type="text"
					className="form-control me-2"
					placeholder="Nhập dữ lệu tìm kiếm..."
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
					<th>giá</th>
					<th>số lượng còn</th>
					<th>danh mục</th>
					<th>mô tả</th>
					<th>ảnh</th>
					<th>tính năng</th>
				</tr>
			</thead>
			<tbody>
				{
					products.map(product=>
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{product.stock}</td>
							<td>{product.category.name}</td>
							<td>{product.description}</td>
							<td>
							{product.images.map(img => (
								<img
								key={img.id}
								src={`http://localhost:8080/uploads/${img.imageUrl}`}
								width="60"
								height="60"
								style={{ marginRight: "5px" }} />
							))}
							</td>
							<td>
							<div className="btn-group" role="group" aria-label="Basic mixed styles example">
							<button type="button" onClick={()=> editProduct(product.id)} className="btn btn-success">edit</button>
							<button  type="button" onClick={()=> handleDelete(product.id)} className="btn btn-danger">xóa</button>
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

export default ListProductComponent
