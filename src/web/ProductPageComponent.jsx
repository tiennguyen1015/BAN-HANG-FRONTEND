import React, {useEffect, useState} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import { listProducts,getProductByCategoryId } from "../services/ProductService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const ProductPageComponent = () => {

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [products, setProducts] = useState([]);

    const getProducts = () => {
        const id = category.split(".")[1];
        getProductByCategoryId(id).then((res) => {
            setProducts(res.data.data.content);
        });
    };
    useEffect(() => {
        if (category) {
            getProducts();
        }
    }, [category]);

    return (
        <div className="shop-container">
            {/* Sidebar */} 
            <aside className="sidebar">
                <h3>
                    Danh mục
                </h3>
                <ul>

                    <li>Tất cả</li>
                    <li>Laptop</li>
                    <li>Điện thoại</li>
                    <li>Phụ kiện</li>

                </ul>
                <h3>
                    Khoảng giá
                </h3>
                <div className="price-filter">
                    <input placeholder="Từ"/>
                    <span>-</span>
                    <input placeholder="Đến"/>
                </div>
                <button className="filter-btn">
                    Áp dụng
                </button>
            </aside>

            {/* Product */}

            <main className="product-area">
              
                <div className="product-grid">
                    {
                        products.map(product=>(
                            <Link
                                    to={`/productDetail/${product.id}`}
                                    className="product-card-link"
                                    key={product.id}
                                >
                            <div 
                                className="shop-card"
                              
                            >
                               
                               <div className="image-box">
                                    {product.images && product.images.length > 1 ? (
                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            navigation
                                            pagination={{ clickable: true }}
                                            autoplay={{
                                                delay: 3000,
                                                disableOnInteraction: false,
                                            }}
                                            loop={true}
                                            className="product-swiper"
                                        >
                                            {product.images.map((image) => (
                                                <SwiperSlide key={image.id}>
                                                    <img
                                                        src={`http://localhost:8080/uploads/${image.imageUrl}`}
                                                        alt={product.name}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    ) : (
                                        <img
                                            src={`http://localhost:8080/uploads/${product.images?.[0]?.imageUrl}`}
                                            alt={product.name}
                                        />
                                    )}

                                    <span className="discount">
                                        -10%
                                    </span>
                                </div>
                                    <h4>
                                        {product.name}
                                    </h4>
                             
                                <div className="rating">

                                    ⭐⭐⭐⭐⭐

                                </div>
                                <div className="bottom">
                                    <span className="price">
                                        {
                                        Number(product.price)
                                        .toLocaleString("vi-VN")
                                        } đ

                                    </span>
                                    <span className="sold">

                                        Đã bán 120
                                    </span>
                                </div>
                            </div>
                        </Link>
                      
                        ))
                        
                    }
                </div>
            </main>


        </div>

    )
}


export default ProductPageComponent;