import React from "react";

const ContactComponent = () => {
  return (
    <>
      {/* BANNER */}
      <section className="banner">
        <h1>Liên hệ với chúng tôi</h1>
        <br />
        <p>Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến của bạn</p>
      </section>
      {/* CONTACT */}
      <section className="contact-container">
        {/* THÔNG TIN */}
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <div className="info-item">
            <div className="icon">📍</div>
            <div>
              <h4>Địa chỉ</h4>
              <p>Nghệ An, Việt Nam</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon">📞</div>
            <div>
              <h4>Số điện thoại</h4>
              <p>0123 456 789</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon">✉️</div>
            <div>
              <h4>Email</h4>
              <p>support@banhang.com</p>
            </div>
          </div>
          <div className="info-item">
            <div className="icon">⏰</div>
            <div>
              <h4>Thời gian làm việc</h4>
              <p>Thứ 2 - Thứ 7: 8:00 - 17:30</p>
            </div>
          </div>
        </div>
        {/* FORM */}
        <div className="contact-form">
          <h2>Gửi tin nhắn</h2>
          <form onsubmit="sendMessage(event)">
            <div className="form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên" required="" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                required=""
              />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="tel" placeholder="Nhập số điện thoại" />
            </div>
            <div className="form-group">
              <label>Nội dung</label>
              <textarea
                placeholder="Nhập nội dung cần hỗ trợ..."
                required=""
                defaultValue={""}
              />
            </div>
            <button type="submit" className="btn-submit">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactComponent;
