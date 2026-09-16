import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listCaregory } from "../../services/CategoryService";
import { getProductById,updateProduct } from '../../services/ProductService';


const EditProductComponent = () => {
	const {id}= useParams();
	const navigate = useNavigate();
	const [categories,setCategories]=useState([]);
	const [files,setFiles]= useState([]);
	const [deleteImageIds, setDeleteImageIds] = useState([]);

	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		images: [],
		category: {
			id: ""
		}
	});

	const handleChange=(e)=>{
		const{name,value}= e.target
		if(name=== "category"){
		  setProduct({
			...product,
			category:{
			  id:value
			}
		  });
		}else{
		  setProduct({
			...product,
			[name]: value
		  });
		}
	}

	useEffect(()=>{
		const token = localStorage.getItem("token");
		if(!token){
			navigate("/login");
			return;
		}

		getProductById(id)
		.then(res=>{
			setProduct(res.data.data)
			// console.log(res.data.data.content);
		});

		listCaregory()
			.then(res=>{
			setCategories(res.data.data.content);
			});
	},[id,navigate]);

	function handleUpdateProduct(e){
		e.preventDefault();	
		const formData = new FormData();

		formData.append(
			"product",
			new Blob(
				[JSON.stringify(product)],
				{
					type: "application/json"
				}
			)
		);
		files.forEach(item => {
			formData.append("file", item.file);
		});

		deleteImageIds.forEach(id => {
			formData.append("deleteImageIds", id);
		});

		updateProduct(id,formData)
		.then(res => {
			alert(res.data.message);
			navigate("/products");
		})
		.catch(error => {
			console.log(error);
			alert(error.response.data.message);
		});
	}

	const handleDeleteImage = (imageId) => {
		setDeleteImageIds(prev => [...prev, imageId]);
		setProduct(prev => ({
			...prev,
			images: prev.images.filter(img => img.id !== imageId)
		}));
	};

	const handleFileChange = (e) => {
		const newFiles = Array.from(e.target.files).map(file => ({
			file,
			preview: URL.createObjectURL(file)
		}));

		setFiles(prev => [...prev, ...newFiles]);
		setFileNames(prev => {
			const names = newFiles.map(item => item.file.name).join(", ");
			return prev ? `${prev}, ${names}` : names;
		});
		e.target.value = "";
	};

	const handleRemoveNewFile = (index) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

  return (
	<div className="conten">
	<div className="card">
	  <h2>Thêm sản phẩm</h2>

	  <form onSubmit={handleUpdateProduct}>
		<div className="form-group">
		  <label>Tên sản phẩm</label>
		  <input onChange={handleChange}
			type="text"
			name="name"
			value={product.name||""}
			placeholder="Nhập tên sản phẩm"
		  />
		</div>

		<div className="form-group">
		  <label>Mô tả</label>
		  <input onChange={handleChange}
			type="text"
			name="description"
			value={product.description||""}
			placeholder="Nhập mô tả"
		  />
		</div>

		<div className="form-group">
		  <label>Giá</label>
		  <input onChange={handleChange}
			type="number"
			name="price"
			value={product.price||""}
			placeholder="Nhập giá"
		  />
		</div>

		<div className="form-group">
		  <label>Số lượng</label>
		  <input onChange={handleChange}
			type="number"
			name="stock"
			value={product.stock||""}
			placeholder="Nhập số lượng"
		  />
		</div>

		<div className="form-group">
		  <label>Danh mục</label>

		  <select name="category"  
		  value={product.category.id}
		  onChange={handleChange}

			>
			<option value="">-- Danh mục --</option>
			{categories.map(categorie => (
			  <option
				  key={categorie.id}
				  value={categorie.id}
			  >
				  {categorie.name}
			  </option>
			))}
		  </select>
		</div>

		{/* Upload ảnh */}
		<div className="form-group">
		  <label>Hình ảnh</label>
		  <input
			type="file"
			accept="image/*"
			multiple
			onChange={handleFileChange}
		  />
		</div>

		<div className="preview-container">
		{/* Ảnh cũ */}
		{product.images?.map((image) => (
			<div key={image.id} className="preview-item">
				<button
					type="button"
					className="delete-btn"
					onClick={() => handleDeleteImage(image.id)}
				>
					✕
				</button>
				<img
					src={`https://ban-hang-production.up.railway.app/uploads/${image.imageUrl}`}
					alt={image.imageUrl}
					width="120"
				/>
				<p>{image.imageUrl}</p>
			</div>
		))}

			{/* Ảnh mới */}
			{files.map((file, index) => (
				<div key={index} className="preview-item">
					<button
						type="button"
						className="delete-btn"
						onClick={() => handleRemoveNewFile(index)}
					>
						✕
					</button>
					<img
						src={file.preview}
						alt="preview"
						width="120"
					/>
					<p>{file.file.name}</p>
				</div>
			))}
			</div>	
				<button type="submit">Lưu</button>
		</form>
			</div>
		</div>
	)
}
export default EditProductComponent