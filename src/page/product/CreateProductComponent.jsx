import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCaregory } from "../../services/CategoryService";
import { createProduct } from "../../services/ProductService";
const CreateProductComponent = () => {

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const categoryFillter={
      id:'id',
      name:'name',
      description:'description'
  }

  const [files, setFiles] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
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

  listCaregory()
  .then(res=>{
    setCategories(res.data.data.content);
  });
},[navigate])

  const saveProduct = (e) => {
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
    files.forEach(file => {
        formData.append("file", file);
    });
    createProduct(formData);
    alert("Thêm người dùng thành công");
    navigate("/products");
}


  return (
    <div className="conten">
      <div className="card">
        <h2>Thêm sản phẩm</h2>

        <form onSubmit={saveProduct}>

          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input onChange={handleChange}
              type="text"
              name="name"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <input onChange={handleChange}
              type="text"
              name="description"
              placeholder="Nhập mô tả"
            />
          </div>

          <div className="form-group">
            <label>Giá</label>
            <input onChange={handleChange}
              type="number"
              name="price"
              placeholder="Nhập giá"
            />
          </div>

          <div className="form-group">
            <label>Số lượng</label>
            <input onChange={handleChange}
              type="number"
              name="stock"
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
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
          </div>

          {/* Ô xem trước ảnh */}
          <div className="preview-container">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div className="preview-item" key={index}>
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                  />
                  <p>{file.name}</p>
                </div>
              ))
            ) : (
              <div className="preview-empty">
                Chưa chọn ảnh
              </div>
            )}
          </div>

          <button type="submit">Lưu</button>

        </form>
      </div>
    </div>
  );
};

export default CreateProductComponent;