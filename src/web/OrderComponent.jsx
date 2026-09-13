import React, { useEffect, useState } from "react";
import "../assets/css/web/Order.css";
import {
  deleteOrderItem,
  getOrder,
  getOrderByStatus,
  getOrderByUser,
} from "../services/OrderService";
import { buyAgain } from "../services/OrderService";
import { useNavigate } from "react-router-dom";
const OrderComponent = () => {
  const [orders, setOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await getOrder();
      setOrder(res.data.data);
    } catch (error) {
      console.log("lỗi");
    }
  };
  const orderStatus = {
    PENDING: {
      text: "Chờ xác nhận",
      className: "status-pending",
    },
    CONFIRMED: {
      text: "Đã xác nhận",
      className: "status-confirmed",
    },
    SHIPPING: {
      text: "Đang giao hàng",
      className: "status-shipping",
    },
    DELIVERED: {
      text: "Đã giao hàng",
      className: "status-delivered",
    },
    CANCELLED: {
      text: "Đã hủy",
      className: "status-cancelled",
    },
  };

  const handleClearItem = async (orderId) => {
    console.log(orderId);

    if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) {
      return;
    }

    try {
      await deleteOrderItem(orderId);
      alert("Hủy đơn hàng thành công");
      loadOrder();
    } catch (error) {
      console.error("Lỗi xóa cart item:", error);
      alert(error.response?.data?.message || "Xóa sản phẩm thất bại");
    }
  };

  const handleBuyAgain = async (orderId) => {
    console.log("dnvn" + orderId);
    try {
      await buyAgain(orderId);
      alert("Đã thêm đơn hàng vào giỏ!");
      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert("Không thể mua lại đơn hàng!");
    }
  };

  const loadOrdersByStatus = async (status) => {
    try {
      const res = await getOrderByStatus(status);
      console.log(res.data);
      setOrder(res.data.data);
    } catch (error) {
      console.error("lỗi lấy đơn hàng", error);
    }
  };

  const loadOrdersByUser = async () => {
    try {
      const res = await getOrderByUser();
      console.log(res.data);
      setOrder(res.data.data);
    } catch (error) {
      console.error("lỗi lấy đơn hàng", error);
    }
  };

  const handleOrderByIdAndUser = (orderId) => {
    // navigate(`/detailOrder/${orderId}`);
  };

  return (
    <div className="container-order">
      <h2>Đơn hàng của tôi</h2>
      <div className="tabs">
        <button onClick={() => loadOrdersByUser()}>Tất cả</button>
        <button onClick={() => loadOrdersByStatus("PENDING")}>
          Chờ xác nhận
        </button>
        <button onClick={() => loadOrdersByStatus("CONFIRMED")}>
          Đã xác nhận
        </button>
        <button onClick={() => loadOrdersByStatus("SHIPPING")}>
          Đang giao
        </button>
        <button onClick={() => loadOrdersByStatus("DELIVERED")}>Đã giao</button>
        <button onClick={() => loadOrdersByStatus("CANCELLED")}>Đã hủy</button>
      </div>
      {/* Đơn hàng */}

      {orders?.map((order) => (
        <div className="order" key={order.id}>
          <div className="order-header">
            <span>Shop Laptop ABC</span>
            <div>
              <span className={orderStatus[order.orderStatus]?.className}>
                {orderStatus[order.orderStatus]?.text}
              </span>
            </div>
          </div>
          {/* Sản phẩm */}
          {order.orderItems?.map((item) => (
            <div className="product-order" key={item.id}>
              <img
                src={`http://localhost:8080/uploads/${item.product.images?.[0]?.imageUrl}`}
                alt=""
              />
              <div className="product-info">
                <h3>{item.product?.name}</h3>
                <p>RAM 16GB | RTX 4050 | SSD 512GB</p>
                <span>{item?.quantity} x </span>
              </div>
              <div className="price">
                {item?.price?.toLocaleString("vi-VN")}đ
              </div>
            </div>
          ))}

          <div className="total">
            Tổng thanh toán:
            <span>{order?.totalPrice?.toLocaleString("vi-VN")}đ</span>
          </div>

          <div className="actions">
            <button
              onClick={() => handleOrderByIdAndUser(order.id)}
              className="detail"
            >
              Xem chi tiết
            </button>
            <button onClick={() => handleBuyAgain(order.id)}>Mua lại</button>
            {order?.orderStatus === "PENDING" && (
              <button className="buy" onClick={() => handleClearItem(order.id)}>
                Hủy
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default OrderComponent;
