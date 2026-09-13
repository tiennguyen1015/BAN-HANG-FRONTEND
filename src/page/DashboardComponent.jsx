import React, { useEffect, useState } from "react";
import { getProfile } from "../services/AuthService";
import { getDashboard } from "../services/DashboardService";
import { getOrderToday } from "../services/OrderService";
import { getProductStock } from "../services/ProductService";

const DashboardComponent = () => {
  const [dashboard, setDashboard] = useState();
  const [user, setUser] = useState(null);
  const [orders, setOrder] = useState([]);
  const [products, setProduct] = useState([]);
  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (error) {
      console.error("Lỗi lấy thông tin user:", error);
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await getOrderToday();
      setOrder(res.data.data.content);
    } catch (error) {
      console.error("Lấy đơen hàng trong ngày thất bại", error);
    }
  };
  useEffect(() => {
    loadOrder();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await getProductStock();
      setProduct(res.data.data.content);
    } catch (error) {
      console.error("Lấy đơn hàng gần hết thất bại", error);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);

  const orderStatus = {
    PENDING: {
      text: "Chờ xác nhận",
      className: "text-dark",
    },
    CONFIRMED: {
      text: "Đã xác nhận",
      className: "text-success",
    },
    SHIPPING: {
      text: "Đang giao hàng",
      className: "ttext-warning",
    },
    DELIVERED: {
      text: "Đã giao hàng",
      className: "text-success",
    },
    CANCELLED: {
      text: "Đã hủy",
      className: "text-danger",
    },
  };

  return (
    <>
      <div className="welcome">
        <h1>Xin chào, {user?.name} 👋</h1>
        <p>Đây là tổng quan hoạt động của cửa hàng</p>
      </div>
      {/* ================= STATISTICS ================= */}
      <div className="stats">
        {/* PRODUCTS */}
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng sản phẩm</p>
            <h2>{dashboard?.totalProducts}</h2>
          </div>
          <div className="stat-icon product-icon">📦</div>
        </div>
        {/* USERS */}
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng người dùng</p>
            <h2>{dashboard?.totalUsers}</h2>
          </div>
          <div className="stat-icon user-icon">👥</div>
        </div>
        {/* ORDERS */}
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng số đơn hàng</p>
            <h2>{dashboard?.totalOrders}</h2>
          </div>
          <div className="stat-icon order-icon">🧾</div>
        </div>
        {/* REVENUE */}
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng doanh thu</p>
            <h2>
              Giá: {Number(dashboard?.totalRevenue).toLocaleString("vi-VN")} ₫
            </h2>
          </div>
          <div className="stat-icon money-icon">💰</div>
        </div>
      </div>
      {/* trong ngày */}
      <div className="welcome">
        <p>Đây là tổng quan hoạt động của cửa hàng hôm nay.</p>
      </div>
      {/* ================= STATISTICS ================= */}
      <div className="stats">
        {/* PRODUCTS */}
        <div className="stat-card">
          <div className="stat-info">
            <p>Số sản phẩm bán được trong ngày</p>
            <h2>{dashboard?.totalProductsToday}</h2>
          </div>
          <div className="stat-icon product-icon">📦</div>
        </div>
        {/* ORDERS */}

        <div className="stat-card">
          <div className="stat-info">
            <p>Số đơn hàng đã giao hoàn thành trong ngày</p>
            <h2>{dashboard?.ordersTodaysuccessful}</h2>
          </div>
          <div className="stat-icon order-icon">✓</div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng đơn hàng được đặt trong ngày</p>
            <h2>{dashboard?.ordersToday}</h2>
          </div>
          <div className="stat-icon order-icon">🧾</div>
        </div>
        {/* REVENUE */}
        <div className="stat-card">
          <div className="stat-info">
            <p>Tổng doanh thu trong ngày</p>
            <h2>
              Giá: {Number(dashboard?.revenueToday).toLocaleString("vi-VN")} ₫
            </h2>
          </div>
          <div className="stat-icon money-icon">💰</div>
        </div>
      </div>

      {/* ================= LOWER CONTENT ================= */}
      <div className="dashboard-grid table">
        {/* ================= NEW ORDERS ================= */}
        <div className="card1">
          <div className="card-header">
            <h3>Đơn hàng mới</h3>
            <a href="#" className="view-all">
              Xem tất cả
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.orderCode}</td>
                  <td>{order.receiverName}</td>
                  <td> {Number(order.totalPrice).toLocaleString("vi-VN")} ₫</td>
                  <td>
                    <span className={orderStatus[order.orderStatus]?.className}>
                      {orderStatus[order.orderStatus]?.text}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ================= LOW STOCK ================= */}
        <div className="card1">
          <div className="card-header">
            <h3>Sản phẩm sắp hết</h3>
            <a href="#" className="view-all">
              Xem tất cả
            </a>
          </div>
          <div className="product-list">
            {products.map((product) => (
              <div className="product-item" key={product.id}>
                <div>
                  <div className="product-name">{product.name}</div>
                  <div className="product-id">#{product.id}</div>
                </div>
                <div className="stock stock-danger">Còn {product.stock}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
