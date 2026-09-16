import React, { useEffect, useState } from "react";
import { getProductById, listProducts,addToCart } from "../services/ProductService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { useNavigate, useParams } from "react-router-dom";
import { getCartByUserId } from "../services/CartService";
const ProductDetailComponent = () => {
	const [product, setProduct] = useState({});
	const [selectedImage, setSelectedImage] = useState("");
	const {id}=useParams();


	useEffect(() => {
    getProductById(id).then(res => {
        const data = res.data.data;
        setProduct(data);
        // lấy ảnh đầu tiên làm ảnh lớn
        if(data.images && data.images.length > 0){
            setSelectedImage(
                `https://ban-hang-production.up.railway.app/uploads/${data.images[0].imageUrl}`
            );

        }

    });
	}, [id]);

	const [quantity, setQuantity] = useState(1);
	const handleIncrease = () => {
		if (quantity < product.stock) {
			setQuantity(prev => prev + 1);
		}
	};
	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	const handleAddToCart=async(productId)=>{
		const token= localStorage.getItem("token")

		if(!token){
			navigate("/loginWeb")
			return;
		}

		try{
			await addToCart(productId,quantity);
			alert("Đã thêm vào giỏ hàng");
	
		}catch(error){
			console.log(error);
			alert("Thêm thất bại");
		}
	}

	const navigate = useNavigate();
	const handleBuyNow = async () => {
		try {
			// 1. Thêm sản phẩm vào giỏ
			await addToCart(product.id, quantity);
			// 2. Lấy lại giỏ hàng
			const res = await getCartByUserId();
			const cart = res.data.data;
			// 3. Tìm cartItem của sản phẩm vừa thêm
			const cartItem = cart.cartItems.find(
				item => item.product.id === product.id
			);
	
			if (!cartItem) {
				alert("Không tìm thấy sản phẩm vừa thêm trong giỏ hàng");
				return;
			}
	
			// 4. Chuyển sang checkout và tự chọn sản phẩm này
			navigate("/checkout", {
				state: {
					cartItemIds: [cartItem.id]
				}
			});
	
		} catch (error) {
			console.error("Lỗi mua ngay:", error);
			alert("Không thể mua ngay");
		}
	};


    return (
		<div className="container">
		<div className="breadcrumb">
		  Trang chủ &gt; Laptop &gt; Gaming &gt; ASUS TUF F15
		</div>
		<div className="product">
		<div className="left">

{/* Ảnh lớn */}
<div className="main-image">
	<img
		src={selectedImage || "/no-image.png"}
		alt={product?.name}
		className="main-img"
	/>
</div>

{/* Danh sách ảnh nhỏ */}
<Swiper
	modules={[Navigation]}
	navigation
	slidesPerView={5}
	spaceBetween={10}
	className="thumb-swiper"
>
	{product?.images?.map((image) => {
		const imageUrl = `https://ban-hang-production.up.railway.app/uploads/${image.imageUrl}`;

		return (
			<SwiperSlide key={image.id}>
				<img
					src={imageUrl}
					alt={product.name}
					className={`thumb-img ${
						selectedImage === imageUrl ? "active" : ""
					}`}
					onClick={() => setSelectedImage(imageUrl)}
				/>
			</SwiperSlide>
		);
	})}
</Swiper>

		</div>
		  <div className="right">
			<h2>
			  {product.description}
			</h2>
			<div className="info">
			  <span>⭐ 4.9</span>
			  <span>|</span>
			  <span>3.258 đánh giá</span>
			  <span>|</span>
			  <span>7.531 đã bán</span>
			</div>
			<div className="price">
				<div>
					{product.name}
				</div>
				<div>
			  <span className="old"> Giá: {Number(product.price).toLocaleString("vi-VN")} ₫</span>
			  <span className="new">{Number(product.price*(1-0.17)).toLocaleString("vi-VN")} ₫</span>
			  <span className="sale">-17%</span>

				</div>
			</div>
			<div className="row">
			  <div className="title">Voucher</div>
			  <div className="content">
				<span className="voucher">Giảm 500K</span>
				<span className="voucher">Freeship</span>
			  </div>
			</div>
			<div className="row">
			  <div className="title">Vận chuyển</div>
			  <div className="content">Miễn phí vận chuyển toàn quốc</div>
			</div>
			<div className="row">
			  <div className="title">Màu sắc</div>
			  <div className="content">
				<button className="option active">Đen</button>
				<button className="option">Xám</button>
			  </div>
			</div>
			<div className="row">
			  <div className="title">Số lượng</div>
			  <div className="content qty">
			<button onClick={handleDecrease}>-</button>
            <input 
                value={quantity}
                readOnly
            />
            <button onClick={handleIncrease}>+</button>
				<span>Số lương còn {product.stock}</span>
			  </div>
			</div>
			<div className="buttons">
			  <button className="cart" onClick={()=>handleAddToCart(product.id)} >
				<i className="fa fa-cart-plus" />
				Thêm vào giỏ hàng
			  </button>
			  <button className="buy"onClick={handleBuyNow} >Mua ngay</button>
			</div>
		  </div>
		</div>

		<div className="detail">
		  <h3>Thông số kỹ thuật</h3>
		  <table>
			<tbody>
			  <tr>
				<td>CPU</td>
				<td>Intel Core i7-13620H</td>
			  </tr>
			  <tr>
				<td>RAM</td>
				<td>16GB DDR5</td>
			  </tr>
			  <tr>
				<td>SSD</td>
				<td>512GB NVMe</td>
			  </tr>
			  <tr>
				<td>Card đồ họa</td>
				<td>RTX 4060 8GB</td>
			  </tr>
			  <tr>
				<td>Màn hình</td>
				<td>15.6 inch FHD 144Hz</td>
			  </tr>
			</tbody>
		  </table>
		</div>
		
		<div className="detail">
		  <h3>Mô tả sản phẩm</h3>
		  <p>
		  {product.description}
		  </p>
		</div>
	  </div>
	  
    );
};
export default ProductDetailComponent;