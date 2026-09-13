import React, { useEffect,useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { listCaregory,save } from '../../services/CategoryService';



const CreatCategoryComponent = () => {

	const navigate= useNavigate();
	const [categories, setCategorie]=useState({
		id:'',
		name:'',
		description:''
	});

	useEffect(()=>{
		const token= localStorage.getItem("token");
		if(!token){
			navigate('/login');
			return;
		}
		listCaregory()
		.then((res)=>{
			setCategorie(res.data.data.content);	
		})
	},[])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCategorie(categorie => ({
			...categorie,
			[name]: value
		}));
	}

	const saveCategory=(e)=>{
		e.preventDefault();
		save(categories).then(res=>{
			alert(res.data.message);
			navigate('/categorys');
		}) .catch(error => {
			console.log(error.response.data);
			alert(error.response.data.message);
		  });
	}

  
  return (
	<div className="conten">
	<div className="card">
      <h2>Thêm danh mục</h2>

      <form onSubmit={saveCategory} >
        <div className="form-group">
          <label>Tên danh mục</label>
          <input
            type="text"
            name="name"
            value={categories.name||""}
            onChange={handleChange}
            placeholder="Nhập họ tên"
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

export default CreatCategoryComponent