import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById,updateCategory  } from '../../services/CategoryService';

const EditCategoryComponent = () => {
	const {id}= useParams();
	const navigate= useNavigate();
	const [categories,setCategorie] = useState({
		name: "",
		description: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategorie(categorie => ({
			...categorie,
			[name]: value
		}));
	}

	useEffect(()=>{
		const token= localStorage.getItem("token")
		if(!token){
			navigate("/login")
			return;
		}
		getCategoryById(id)
		.then((res)=>{
			setCategorie(res.data.data);
		}).catch(error=>{
			console.error(error.response.data.message);
		});
	},[id]);

	const handleUpdateCategory=(e)=>{
		e.preventDefault();
		updateCategory(id,categories)
		.then((res)=>{
			// alert(res.data.message)
			alert("cập nhật thành công")
			navigate('/categorys');
		}).catch(error=>{
			console.error(error.res.data.message);
		})
	}
	
  return (
	<div className="conten">
		 <div className="card">
		   <h2>Sửa danh mục</h2>
	 
		   <form onSubmit={handleUpdateCategory} >
			 <div className="form-group">
			   <label>Tên</label>
			   <input
				 type="text"
				 name="name"
				 value={categories.name|| ""}
				 onChange={handleChange}
				 placeholder="nhập name"
			   />
			 </div>
	 
			 <div className="form-group">
				<label>Mô tả</label>
				<input
					type="text"
					name="description"
					value={categories.description||""}
					onChange={handleChange}
					placeholder="Nhập mô tả"
				/>
				</div>
				<button type="submit">Lưu</button>
		   </form>
		   </div>
		 </div>
  )
}

export default EditCategoryComponent