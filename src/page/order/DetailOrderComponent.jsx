import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/OrderService";

const DetailOrderComponent = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const getOrderId = async () => {
    try {
      const res = await getOrderById(orderId);
      setOrder(res.data.data);
    } catch (error) {
      console.error("lỗi lấy đơn hàng theo id");
    }
  };

  useEffect(() => {
    getOrderId();
  }, [orderId]);

  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return {
          text: "Chờ xác nhận",
          className: "pending",
          step: 1,
        };

      case "CONFIRMED":
        return {
          text: "Đã xác nhận",
          className: "confirmed",
          step: 2,
        };

      case "SHIPPING":
        return {
          text: "Đang vận chuyển",
          className: "shipping",
          step: 3,
        };

      case "DELIVERING":
        return {
          text: "Đang giao",
          className: "delivered",
          step: 4,
        };

      case "DELIVERED":
        return {
          text: "Đã giao",
          className: "delivered",
          step: 5,
        };

      case "CANCELLED":
        return {
          text: "Đã hủy",
          className: "cancelled",
          step: 0,
        };

      default:
        return {
          text: status,
          className: "",
          step: 0,
        };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="dashboard">
      {/* MAIN */}
      <main className="main-content">
        {/* HEADER */}
        <div className="page-header">
          <div>
            <h1>Chi tiết đơn hàng</h1>
            <p>Quản lý và xem thông tin chi tiết đơn hàng</p>
          </div>
        </div>
        <div className="info-grid">
          {/* CUSTOMER */}
          <div className="order-header cardorder">
            <div>
              <span className="label">Mã đơn hàng</span>
              <h5>{order.orderCode}</h5>
            </div>
            <div>
              {/* <span className="label">Ngày đặt hàng</span> */}
              <strong>
                {" "}
                <div className="order-date">
                  Ngày đặt:{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </strong>
            </div>
            <div>
              <span className="label">Trạng thái</span>
              {/* <span className="status shipping">{order.status}</span> */}
              <span className={`status ${statusInfo.className}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>
          {/* PAYMENT */}
          <div className="cardorder">
            <h3>📝 Ghi chú đơn hàng</h3>
            <p className="note">{order.note}</p>
          </div>
        </div>

        {/* CUSTOMER + PAYMENT */}
        <div className="info-grid">
          {/* CUSTOMER */}
          <div className="cardorder">
            <div className="card-title">
              <h3>👤 Thông tin khách hàng</h3>
            </div>
            <div className="info-row">
              <span>Họ và tên</span>
              <strong>{order.receiverName}</strong>
            </div>
            <div className="info-row">
              <span>Số điện thoại</span>
              <strong>{order.receiverPhone}</strong>
            </div>
            <div className="info-row">
              <span>Email</span>
              <strong>{order.receiverEmail}</strong>
            </div>
            <div className="info-row">
              <span>Địa chỉ</span>
              <strong>{order.receiverAddress}</strong>
            </div>
          </div>
          {/* PAYMENT */}
          <div className="cardorder">
            <div className="card-title">
              <h3>💳 Thông tin thanh toán</h3>
            </div>
            <div className="info-row">
              <span>Phương thức</span>
              <strong>{order.paymentMethod}</strong>
            </div>
            <div className="info-row">
              <span>Trạng thái thanh toán</span>
              <span className="payment-success">Chưa thanh toán</span>
            </div>
            <div className="info-row">
              <span>Phí vận chuyển</span>
              <strong>30.000 ₫</strong>
            </div>
          </div>
        </div>
        {/* PRODUCTS */}

        <div className="card1 product-card">
          <div className="card-title">
            <h3>📦 Sản phẩm trong đơn hàng</h3>
            <span>{order?.orderItems?.length || 0} sản phẩm</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="productorder">
                      <img
                        src={`https://ban-hang-production.up.railway.app/uploads/${item.product?.images[0]?.imageUrl}`}
                        alt="Avatar"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />

                      <div>
                        <strong>{item.product?.name}</strong>
                        <small>Mã SP: {item.product?.id}</small>
                      </div>
                    </div>
                  </td>

                  <td>{item?.price?.toLocaleString("vi-VN")} ₫</td>

                  <td>{item.quantity}</td>

                  <td>
                    <strong>
                      {(item?.price * item.quantity)?.toLocaleString("vi-VN")} ₫
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TOTAL */}
        <div className="bottom-grid">
          {/* NOTE */}

          {/* TRẠNG THÁI ĐƠN HÀNG */}
          <div className="cardorder status-card">
            <h3>🚚 Trạng thái đơn hàng</h3>

            {order.status === "CANCELLED" ? (
              // =========================
              // ĐƠN HÀNG ĐÃ HỦY
              // =========================
              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="dot">✓</div>
                  <div>
                    <strong>Đặt hàng</strong>
                    <p>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>

                <div className="timeline-item cancelled">
                  <div className="dot">✕</div>
                  <div>
                    <strong>Đã hủy</strong>
                    <p>Đơn hàng đã bị hủy</p>
                  </div>
                </div>
              </div>
            ) : (
              // =========================
              // ĐƠN HÀNG BÌNH THƯỜNG
              // =========================
              <div className="timeline">
                {/* 1. ĐẶT HÀNG */}
                <div
                  className={`timeline-item ${
                    statusInfo.step >= 1 ? "completed" : ""
                  } ${statusInfo.step === 1 ? "current" : ""}`}
                >
                  <div className="dot">{statusInfo.step >= 1 ? "✓" : ""}</div>

                  <div>
                    <strong>Đặt hàng</strong>

                    <p>
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("vi-VN", {
                            timeZone: "Asia/Ho_Chi_Minh",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>

                {/* 2. ĐÃ XÁC NHẬN */}
                <div
                  className={`timeline-item ${
                    statusInfo.step >= 2 ? "completed" : ""
                  } ${statusInfo.step === 2 ? "current" : ""}`}
                >
                  <div className="dot">{statusInfo.step >= 2 ? "✓" : ""}</div>

                  <div>
                    <strong>Đã xác nhận</strong>

                    <p>
                      {statusInfo.step >= 2
                        ? "Đơn hàng đã được xác nhận"
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>

                {/* 3. ĐANG VẬN CHUYỂN */}
                <div
                  className={`timeline-item ${
                    statusInfo.step >= 3 ? "completed" : ""
                  } ${statusInfo.step === 3 ? "current" : ""}`}
                >
                  <div className="dot">{statusInfo.step >= 3 ? "✓" : ""}</div>

                  <div>
                    <strong>Đang vận chuyển</strong>

                    <p>
                      {statusInfo.step >= 3
                        ? "Đơn hàng đang được vận chuyển"
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>

                {/* 4. ĐANG GIAO */}
                <div
                  className={`timeline-item ${
                    statusInfo.step >= 4 ? "completed" : ""
                  } ${statusInfo.step === 4 ? "current" : ""}`}
                >
                  <div className="dot">{statusInfo.step >= 4 ? "✓" : ""}</div>

                  <div>
                    <strong>Đang giao</strong>

                    <p>
                      {statusInfo.step >= 4
                        ? "Shipper đang giao hàng"
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>

                {/* 5. ĐÃ GIAO */}
                <div
                  className={`timeline-item ${
                    statusInfo.step >= 5 ? "completed" : ""
                  } ${statusInfo.step === 5 ? "current" : ""}`}
                >
                  <div className="dot">{statusInfo.step >= 5 ? "✓" : ""}</div>

                  <div>
                    <strong>Đã giao hàng</strong>

                    <p>
                      {statusInfo.step >= 5
                        ? "Đơn hàng đã giao thành công"
                        : "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TOTAL */}
          <div className="cardorder total-card">
            <div className="total-row">
              <span>Tạm tính</span>
              <strong>{order.totalPrice?.toLocaleString("vi-VN")}đ</strong>
            </div>
            <div className="total-row">
              <span>Phí vận chuyển</span>
              <strong>30.000 ₫</strong>
            </div>
            <div className="total-row">
              <span>Giảm giá</span>
              <strong>0 ₫</strong>
            </div>
            <div className="total-final">
              <span>Tổng tiền</span>
              <strong>{order.totalPrice?.toLocaleString("vi-VN")} ₫</strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DetailOrderComponent;
