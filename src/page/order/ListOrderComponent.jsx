import React, { useEffect, useState } from "react";
import { getAllOrder, updateOrderStatus } from "../../services/OrderService";
import { useNavigate } from "react-router-dom";

const ListOrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const navigate = useNavigate();

  // =========================
  // LOAD ALL ORDER
  // =========================
  const loadOrder = async () => {
    try {
      const res = await getAllOrder();
      console.log("DATA ORDER:", res.data.data);
      setOrders(res.data.data.content || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách đơn hàng:", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((priverOrder) =>
        priverOrder.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Cập nhật trạng thái thành công");
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
    }
  };

  const handleOrderById = (orderId) => {
    navigate(`/detailOrder/${orderId}`);
  };

  // =========================
  // STATUS INFO
  // =========================
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

  // =========================
  // PROCESS STEPS
  // =========================
  const steps = [
    {
      number: 1,
      text: "Chờ xác nhận",
    },
    {
      number: 2,
      text: "Đã xác nhận",
    },
    {
      number: 3,
      text: "Đang vận chuyển",
    },
    {
      number: 4,
      text: "Đang giao",
    },
    {
      number: 5,
      text: "Đã giao",
    },
  ];

  // =========================
  // ACTION BUTTON
  // =========================
  const renderActions = (order) => {
    switch (order.status) {
      case "PENDING":
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => handleOrderById(order.id)}
            >
              Xem chi tiết
            </button>

            <button
              className="btn btn-success"
              onClick={() => handleUpdateStatus(order.id, "CONFIRMED")}
            >
              Xác nhận đơn
            </button>

            <button
              className="btn btn-danger"
              onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
            >
              Hủy đơn
            </button>
          </>
        );

      case "CONFIRMED":
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => handleOrderById(order.id)}
            >
              Xem chi tiết
            </button>

            <button
              className="btn btn-success"
              onClick={() => handleUpdateStatus(order.id, "SHIPPING")}
            >
              Đang vận chuyển
            </button>
          </>
        );

      case "SHIPPING":
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => handleOrderById(order.id)}
            >
              Xem chi tiết
            </button>

            <button
              className="btn btn-success"
              onClick={() => handleUpdateStatus(order.id, "DELIVERING")}
            >
              Đang vận chuyển
            </button>
          </>
        );

      case "DELIVERING":
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => handleOrderById(order.id)}
            >
              Xem chi tiết
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleUpdateStatus(order.id, "CANCELLED")}
            >
              Giao thất bại
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleUpdateStatus(order.id, "DELIVERED")}
            >
              Thành công
            </button>
          </>
        );

      case "DELIVERED":
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => handleOrderById(order.id)}
            >
              Xem chi tiết
            </button>
          </>
        );

      case "CANCELLED":
        return (
          <button
            className="btn btn-primary"
            onClick={() => handleOrderById(order.id)}
          >
            Xem chi tiết
          </button>
        );

      default:
        return null;
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredOrders = orders.filter((order) => {
    const matchSearch = order.orderCode
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter === "ALL" || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <>
      <div className="page-title">
        <h1>Danh sách đơn hàng</h1>
        <p>Quản lý và xác nhận đơn hàng của khách hàng</p>
      </div>

      {/* FILTER */}
      <div className="filter">
        <input
          type="text"
          placeholder="🔍 Tìm mã đơn hàng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">Tất cả trạng thái</option>

          <option value="PENDING">Chờ xác nhận</option>

          <option value="CONFIRMED">Đã xác nhận</option>

          <option value="SHIPPING">Đang vận chuyển</option>

          <option value="DELIVERING">Đang giao</option>

          <option value="DELIVERED">Đã giao</option>

          <option value="CANCELLED">Đã hủy</option>
        </select>
      </div>
      {/* ALL ORDERS */}
      {filteredOrders.map((order) => {
        const statusInfo = getStatusInfo(order.status);
        return (
          <div className="order-card" key={order.id}>
            {/* HEADER */}
            <div className="order-header">
              <div>
                <div className="order-code">{order.orderCode}</div>
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
              </div>
              <span className={`status ${statusInfo.className}`}>
                {statusInfo.text}
              </span>
            </div>

            {/* CUSTOMER */}
            <div className="order-info">
              <div className="info-item">
                <span>Khách hàng</span>
                <strong>{order.receiverName}</strong>
              </div>

              <div className="info-item">
                <span>Số điện thoại</span>
                <strong>{order.receiverPhone}</strong>
              </div>

              <div className="info-item">
                <span>Địa chỉ giao hàng</span>
                <strong>{order.receiverAddress}</strong>
              </div>
            </div>

            {/* PROCESS */}
            {order.status !== "CANCELLED" && order.status !== "DELIVERED" && (
              <>
                <div className="process-title">Tiến trình đơn hàng</div>
                <div className="process">
                  {steps.map((step, index) => {
                    let stepClass = "step";
                    if (statusInfo.step > step.number) {
                      stepClass = "step done";
                    }
                    if (statusInfo.step === step.number) {
                      stepClass = "step active";
                    }
                    return (
                      <React.Fragment key={step.number}>
                        <div className={stepClass}>
                          <div className="step-circle">
                            {statusInfo.step > step.number ||
                            order.status === "DELIVERED"
                              ? "✓"
                              : step.number}
                          </div>
                          <div className="step-text">{step.text}</div>
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={
                              statusInfo.step > step.number
                                ? "step-line done"
                                : "step-line"
                            }
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </>
            )}

            {/* DELIVERED */}
            {order.status === "DELIVERED" && (
              <div className="cancelled-message">
                ✅ Đơn hàng giao thành công
              </div>
            )}

            {/* CANCELLED */}
            {order.status === "CANCELLED" && (
              <div className="cancelled-message">❌ Đơn hàng giao thất bại</div>
            )}

            {/* FOOTER */}
            <div className="order-footer">
              <div className="total">
                Tổng tiền:
                <strong>
                  {Number(order.totalPrice || 0).toLocaleString("vi-VN")}đ
                </strong>
              </div>

              <div className="actions">{renderActions(order)}</div>
            </div>
          </div>
        );
      })}

      {/* NO DATA */}
      {filteredOrders.length === 0 && (
        <div className="no-order">Không tìm thấy đơn hàng</div>
      )}
    </>
  );
};

export default ListOrderComponent;
