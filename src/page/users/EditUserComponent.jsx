import React,{useEffect, useState} from 'react';
import {  useParams , useNavigate  } from 'react-router-dom';
import { getUserById,updateUser } from '../../services/UserService';

const EditUserComponent = () => {
	const { id } = useParams();  
	console.log("id =",id);
	// console.log("user =",user);

	const[user,setUser] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		password: "",
		role: {
			id: ""
		}
	})
		useEffect(()=> {
			
			getUserById(id).then((response)=>{
				console.log(user);
				setUser(response.data.data);
				
			}).catch(error=>{
				console.error(error.response.data.message);
			})
		},[id]);


		const handleChange = (e) => {
			const { name, value } = e.target;
		
			if (name === "role") {
				setUser({
					...user,
					role: {
						id: value
					}
				});
			} else {
				setUser({
					...user,
					[name]: value
				});
			}
		};
		
    // Handle data submission
	const navigate = useNavigate();
    const handleUpdateUser = (e) => {
        e.preventDefault();

        updateUser(id,user).then(res => {
			// alert(res.data.message);
			alert("cập nhật thành công")
			navigate("/users");
		// Redirect back to list page after success
        }).catch(error => {
			alert("Không thể kết nối tới server");
		});
    };


	return (
		<div className="conten">
		 <div className="card">
		   <h2>Sửa Người Dùng</h2>
	 
		   <form onSubmit={handleUpdateUser}>
			 <div className="form-group">
			   <label>Họ và tên</label>
			   <input
				 type="text"
				 name="name"
				 value={user.name|| ""}
				 onChange={handleChange}
				 placeholder="nhập name"
			   />
			 </div>
	 
			 <div className="form-group">
			   <label>Email</label>
			   <input
				 type="email"
				 name="email"
				 value={user.email}
				 onChange={handleChange|| ""}
				 placeholder="Nhập email"
			   />
	 
				 {/* {emailError && (
				   <span style={{ color: "red" }}>
					 {emailError}
				   </span>
				 )} */}
	 
			 </div>
	 
			 <div className="form-group">
			   <label>Số điện thoại</label>
			   <input
				 type="text"
				 name="phone"
				 value={user.phone|| ""}
				 onChange={handleChange}
				 placeholder="Nhập số điện thoại"
			   />
			 </div>
			 <div className="form-group">
			   <label>địa chỉ</label>
			   <input
				 type="address"
				 name="address"
				 value={user.address|| ""}
				 onChange={handleChange}
				 placeholder="Nhập địa chỉ"
			   />
			 </div>
			 <div className="form-group">
			   <label>mật khẩu</label>
			   <input
				 type="password"
				 name="password"
				 value={user.password|| ""}
				 onChange={handleChange}
				 placeholder="Nhập mật khẩu"
			   />
			 </div>
			 <div className="form-group">
			   <label>Role</label>
			   <select
				   name="role"
				   value={user.role?.id|| ""}
				   onChange={handleChange}
				 >
				  <option value="">-- Chọn quyền --</option>
				   <option  value="1">ADMIN</option>
				   <option value="2">USER</option>
				 </select>
			 </div>
	 
	 
			 <button type="submit">Lưu</button>
		   </form>
		   </div>
		 </div>
	   )
}
export default EditUserComponent