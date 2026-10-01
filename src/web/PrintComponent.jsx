import React from "react";
import "../assets/css/web/print.css";
const PrintComponent = () => {
  return (
    <main className="page">
      <section className="invoice">
        <div className="invoice-header">
          <div>
            <h1>BAN-HANG</h1>
            <p className="muted">Website bán hàng trực tuyến</p>
            <p className="muted">Địa chỉ: Nam Đàn, Nghệ An</p>
            <p className="muted">Điện thoại: 0987 654 321</p>
          </div>
          <div className="invoice-title">
            <h2>HÓA ĐƠN BÁN HÀNG</h2>
            <p>
              Mã hóa đơn: <strong>ORD-20260901-00001</strong>
            </p>
            <p>Ngày đặt: 01/09/2026</p>
            <span className="status">Đã giao</span>
          </div>
        </div>
        <div className="divider" />
        <section className="info-grid">
          <div className="info-box">
            <h3>Thông tin khách hàng</h3>
            <p>
              <span>Họ và tên:</span> Nguyễn Xuân Tiến
            </p>
            <p>
              <span>Số điện thoại:</span> 0987654321
            </p>
            <p>
              <span>Email:</span> tiennguyenxuan092@gmail.com
            </p>
            <p>
              <span>Địa chỉ:</span> Nam Đàn, Nghệ An
            </p>
          </div>
          <div className="info-box">
            <h3>Thông tin thanh toán</h3>
            <p>
              <span>Phương thức:</span> COD
            </p>
            <p>
              <span>Trạng thái:</span> Chưa thanh toán
            </p>
            <p>
              <span>Phí vận chuyển:</span> 30.000 đ
            </p>
            <p>
              <span>Ghi chú:</span> bka bak
            </p>
          </div>
        </section>
        <section className="products">
          <div className="section-heading">
            <h3>Chi tiết sản phẩm</h3>
            <span>1 sản phẩm</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th className="product-column">Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className="product-column">
                  <strong>Laptop Dell 15 inch</strong>
                  <small>Mã sản phẩm: SP-4</small>
                </td>
                <td>3</td>
                <td>160.000.000 đ</td>
                <td>480.000.000 đ</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="summary1">
          <div className="thank-you">
            <h3>Cảm ơn quý khách!</h3>
            <p>Vui lòng giữ hóa đơn để được hỗ trợ khi cần thiết.</p>
          </div>
          <div className="summary-box">
            <div>
              <span>Tạm tính</span>
              <strong> 480.000.000 đ</strong>
            </div>
            <div>
              <span>Phí vận chuyển</span>
              <strong> 30.000 đ</strong>
            </div>
            <div>
              <span>Giảm giá</span>
              <strong> 0 đ</strong>
            </div>
            <div className="total">
              <span>Tổng tiền</span>
              <strong> 480.030.000 đ</strong>
            </div>
          </div>
        </section>
        <section className="signatures">
          <div>
            <strong>Người mua hàng</strong>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
          <div>
            <strong>Người bán hàng</strong>
            <p>(Ký và ghi rõ họ tên)</p>
          </div>
        </section>
        <div className="actions">
          <button className="btn btn-primary" onclick="window.print()">
            🖨️ In hóa đơn
          </button>
          <button className="btn btn-secondary" onclick="window.history.back()">
            Quay lại
          </button>
        </div>
      </section>
    </main>
  );
};

export default PrintComponent;
