import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { listCaregory } from "../services/CategoryService";
import { useState, useEffect } from "react";
import { listProducts } from "../services/ProductService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { addToCart } from "../services/ProductService";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const HomeComponent = () => {
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const getCategory = () => {
    listCaregory().then((res) => {
      setCategorys(res.data.data.content);
    });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const getProducts = () => {
    listProducts().then((res) => {
      setProducts(res.data.data.content);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/loginWeb");
      return;
    }

    try {
      await addToCart(productId, 1);
      alert("Đã thêm vào giỏ hàng");
    } catch (error) {
      console.log(error);
      alert("Thêm thất bại");
    }
  };

  return (
    <div className="home">
      {/* Banner */}
      <section className="banner">
        <div className="banner-content">
          <h1>Siêu Sale 50%</h1>
          <p>Giảm giá hàng ngàn sản phẩm công nghệ.</p>
          <button>Mua ngay</button>
        </div>
      </section>

      {/* Danh mục */}
      <section className="category-section">
        <h2>Danh mục nổi bật</h2>

        <div className="category-list">
          <div className="categories-grid">
            {categorys.map((category) => (
              <Link
                key={category.id}
                to={`/productPage?category=${category.name}`}
                className="category-card"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sản phẩm */}
      <section className="product-section">
        <h2>Sản phẩm nổi bật</h2>

        <div className="product-list">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <Link
                to={`/productDetail/${product.id}`}
                className="product-card-link"
              >
                {product.images && product.images.length > 1 ? (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    className="product-swiper"
                  >
                    {product.images.map((image) => (
                      <SwiperSlide key={image.id}>
                        <img
                          src={`https://ban-hang-production.up.railway.app/uploads/${image.imageUrl}`}
                          alt={product.name}
                          className="product-image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    src={
                      product.images?.length
                        ? `https://ban-hang-production.up.railway.app/uploads/${product.images[0].imageUrl}`
                        : "/no-image.png"
                    }
                    alt={product.name}
                    className="product-image"
                  />
                )}

                <div className="product-content">
                  <h3>{product.name}</h3>

                  <p className="price">
                    Giá: {Number(product.price).toLocaleString("vi-VN")} ₫
                  </p>

                  <div className="product-info">
                    <div className="stock">
                      Còn: <span>{product.stock} sản phẩm</span>
                    </div>

                    <div className="rating">
                      ⭐⭐⭐⭐⭐ <span>(4{product.rating})</span>
                    </div>
                  </div>
                </div>
              </Link>

              <button
                className="cart"
                onClick={() => handleAddToCart(product.id)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Khuyến mãi */}
      <section className="sale">
        <div className="sale-box">
          <h2>Flash Sale</h2>

          <p>Giảm tới 70% chỉ hôm nay.</p>

          <button>Xem ngay</button>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
