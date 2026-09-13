import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCartByUserId } from "../services/CartService";
import { createOrder } from "../services/OrderService";

const CheckOutComponent = () => {
  const location = useLocation();
  const cartItemIds = location.state?.cartItemIds || [];
  console.log(cartItemIds);
  const [cartItems, setCartItem] = useState([]);

  const [order, setOrder] = useState({
    items: [],
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    note: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCartByUserId();
      // Lấy cart
      const cart = res.data.data;
      // Lấy những cartItem mà người dùng đã chọn
      const selectedCartItems = cart.cartItems.filter((item) =>
        cartItemIds.includes(item.id)
      );
      console.log("Sản phẩm được chọn:", selectedCartItems);
      setCartItem(selectedCartItems);
    } catch (error) {
      console.error("lỗi lấy giỏ hàng", error);
    }
  };

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const shippingFee = 0;
  const discount = 0;
  const totalPayment = subtotal + shippingFee - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleOrder = async () => {
    try {
      // Kiểm tra thông tin người nhận
      if (!order.receiverName.trim()) {
        alert("Vui lòng nhập họ tên");
        return;
      }

      if (!order.receiverPhone.trim()) {
        alert("Vui lòng nhập số điện thoại");
        return;
      }

      if (!order.receiverEmail.trim()) {
        alert("Vui lòng nhập email");
        return;
      }

      if (!order.receiverAddress.trim()) {
        alert("Vui lòng nhập địa chỉ");
        return;
      }

      // Chuyển cartItems thành items của OrderRequest
      const items = cartItems.map((item) => ({
        cartItemId: item.id,
        productId: item.product.id,
        quantity: item.quantity,
      }));

      // Tạo request gửi Backend
      const orderRequest = {
        items: items,

        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        receiverEmail: order.receiverEmail,
        receiverAddress: order.receiverAddress,

        note: order.note,
        paymentMethod: order.paymentMethod,
      };

      console.log("Dữ liệu gửi lên:", orderRequest);

      // Gọi API
      const res = await createOrder(orderRequest);

      console.log("Đặt hàng thành công:", res.data);

      alert("Đặt hàng thành công!");

      // Chuyển sang trang đơn hàng
      navigate("/order");
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);

      if (error.response) {
        console.log("Backend trả về:", error.response.data);
        alert(error.response.data.message || "Đặt hàng thất bại");
      } else {
        alert("Không thể kết nối đến server");
      }
    }
  };

  return (
    <div className="container-checkout">
      <h1>Thanh Toán</h1>
      {/* Thông tin nhận hàng */}
      <div className="card=checkout">
        <h2>📍 Thông tin nhận hàng</h2>
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="receiverName"
            placeholder="Nhập họ và tên"
            value={order.receiverName}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <div className="form-group">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="receiverPhone"
              placeholder="Số điện thoại"
              value={order.receiverPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="receiverEmail"
              placeholder="Email"
              value={order.receiverEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="receiverAddress"
            placeholder="Nhập địa chỉ"
            value={order.receiverAddress}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ghi chú</label>
          <textarea
            name="note"
            placeholder="Ghi chú cho người giao hàng"
            value={order.note}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Danh sách sản phẩm */}
      <div className="card-checkout">
        <h2>🛒 Sản phẩm</h2>
        <table>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>SL</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="product-checkout">
                  <img
                    src={`http://localhost:8080/uploads/${item.product.images?.[0]?.imageUrl}`}
                    alt={item.product.name}
                  />
                  <div>
                    <h4>{item.product.name}</h4>
                    <p>Màu Titan</p>
                  </div>
                </td>
                <td> {item.product.price.toLocaleString()}đ</td>
                <td>{item.quantity}</td>
                <td className="price">
                  {(item.product.price * item.quantity).toLocaleString()}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Thanh toán */}
      <div className="card-checkout">
        <h2>💳 Phương thức thanh toán</h2>

        <div className="payment">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={order.paymentMethod === "COD"}
              onChange={handleChange}
            />
            Thanh toán khi nhận hàng (COD)
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="BANK"
              checked={order.paymentMethod === "BANK"}
              onChange={handleChange}
            />
            Chuyển khoản ngân hàng
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="VNPAY"
              checked={order.paymentMethod === "VNPAY"}
              onChange={handleChange}
            />
            VNPay
          </label>
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="card total-card">
        <div className="summary">
          <div>
            <span>Tạm tính</span>
            <span>{subtotal}</span>
          </div>
          <div>
            <span>Phí vận chuyển</span>
            <span>30.000đ</span>
          </div>
          <div>
            <span>Giảm giá</span>
            <span>-100.000đ</span>
          </div>
          <hr />
          <div className="total">
            <span>Tổng thanh toán</span>
            <span>{totalPayment}</span>
          </div>
        </div>
        <button onClick={handleOrder}>ĐẶT HÀNG</button>
      </div>
    </div>
  );
};

export default CheckOutComponent;
