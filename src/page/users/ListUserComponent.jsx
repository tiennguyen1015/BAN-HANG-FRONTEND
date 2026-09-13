import React,{useEffect, useState} from 'react'
import { listUser,deleteUser } from '../../services/UserService'
import { useNavigate } from 'react-router-dom'
import PaginationComponent from '../../component/PaginationComponent'

const ListUserComponent = () => {

	const[users,setUser] = useState([])
	const [keyword, setKeyword] = useState("");
	const [searchKeyword, setSearchKeyword] = useState("");
	
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const visiblePages = 5;
	const currentGroup = Math.floor(page / visiblePages);
	const startPage = currentGroup * visiblePages;
	const endPage = Math.min(startPage + visiblePages, totalPages);

	const getUser = () => {
		const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

		listUser(searchKeyword, page, 5)
		.then((res) => {
			setUser(res.data.data.content);
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
		})
	}


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login");
			return;
		}
		getUser();
	}, [page, searchKeyword]);


	const navigate = useNavigate();
	function addUser() {
		navigate("/users/Create");
	}


	const editUser = (id) => {
		console.log("ID truyền đi:", id);
		navigate(`/users/Edit/${id}`);
	};


	const handleDelete  = (id) => {
		if (!window.confirm("Bạn có chắc muốn xóa?")) {
			return;
		}
		deleteUser(id)
			.then((response) => {
				alert(response.data.message);
				// listUser(); // Load lại danh sách
				setUser(prev => prev.filter(users => users.id !== id));
			})
			.catch((error) => {
				alert(error.response?.data?.message || "Xóa thất bại");
			});
	};

 return (
	
	<div className='container'>
		<h2 className='text-center'>Danh sách user</h2>
		
		<div className="d-flex justify-content-between align-items-center my-3">
			<button className="btn btn-primary w-auto" onClick={addUser}>
				Thêm người dùng
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
				type='submit' 
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
					<th>email</th>
					<th>dia chi </th>
					<th>sdt</th>
					<th>chức vụ</th>
					<th>mô tả chức vụ</th>
					<th>tính năng</th>
				</tr>
			</thead>
			<tbody>
				{
					users.map(user=>
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.address}</td>
							<td>{user.phone}</td>
							<td>{user.role.name}</td>
							<td>{user.role.description}</td>
							<td>
							<div className="btn-group" role="group" aria-label="Basic mixed styles example">
							<button onClick={() => editUser(user.id)} type="button" className="btn btn-success">edit</button>
							<button onClick={() => handleDelete (user.id)} type="button" className="btn btn-danger">xóa</button>
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
export default ListUserComponent