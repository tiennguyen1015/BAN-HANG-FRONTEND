import React, { useEffect, useRef, useState } from "react";
import "../assets/css/web/VerifyEmail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/AuthService";

const VerifyEmailComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const email = location.state?.email;
  console.log("email cần xác thực là:", email);
  // 6 ô OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  // Thời gian còn lại
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!email) {
      return 0;
    }
    const expireTime = localStorage.getItem(`otpExpireTime_${email}`);
    if (!expireTime) {
      // Nếu chưa có thời gian hết hạn thì tạo mới 5 phút
      const newExpireTime = Date.now() + 5 * 60 * 1000;
      localStorage.setItem(`otpExpireTime_${email}`, newExpireTime.toString());
      return 300;
    }
    // Tính thời gian còn lại
    const remaining = Math.floor((Number(expireTime) - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  });

  // Đếm ngược
  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }
    const timer = setInterval(() => {
      const expireTime = localStorage.getItem(`otpExpireTime_${email}`);
      if (!expireTime) {
        setTimeLeft(0);
        return;
      }
      const remaining = Math.floor((Number(expireTime) - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(timer);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [email, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Nhập OTP
  const handleOtpChange = (index, value) => {
    // Hết thời gian thì không cho nhập
    if (timeLeft <= 0) {
      return;
    }

    // Chỉ cho phép nhập số
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Nếu đã nhập số -> chuyển sang ô tiếp theo
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      // Nếu ô hiện tại đã có số
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      // Nếu ô hiện tại trống -> quay lại ô trước
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Xác nhận email
  const handleVerifyEmail = () => {
    const otpCode = otp.join("");

    // Kiểm tra email
    if (!email) {
      alert("Không tìm thấy email cần xác nhận!");
      return;
    }

    // Kiểm tra OTP
    if (otpCode.length !== 6) {
      alert("Vui lòng nhập đủ 6 số!");
      return;
    }

    // Kiểm tra thời gian
    if (timeLeft <= 0) {
      alert("Mã xác nhận đã hết hạn!");
      return;
    }

    setLoading(true);

    const data = { email: email, otp: otpCode };

    verifyEmail(data)
      .then((response) => {
        alert("đăng kí thành công");

        // Xóa thời gian OTP sau khi xác nhận thành công
        localStorage.removeItem(`otpExpireTime_${email}`);

        // Chuyển về đăng nhập
        navigate("/loginWeb");
      })
      .catch((error) => {
        console.log("VERIFY ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);

        alert(error.response?.data?.message || "Xác nhận email thất bại!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="verify-email-container">
      <h2>Xác nhận email</h2>

      <p className="verify-description">
        Mã xác nhận đã được gửi đến email của bạn.
        <br />
        Vui lòng nhập mã gồm 6 chữ số.
      </p>

      {/* Đồng hồ */}
      <div className="otp-timer">
        {timeLeft > 0 ? (
          <>
            Mã xác nhận có hiệu lực trong:{" "}
            <strong>
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </strong>
          </>
        ) : (
          <strong>Mã xác nhận đã hết hạn</strong>
        )}
      </div>

      {/* 6 ô OTP */}
      <div className="otp-input-group">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength={1}
            value={value}
            className="otp-input"
            disabled={timeLeft <= 0 || loading}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
          />
        ))}
      </div>

      {/* Nút xác nhận */}
      <button
        type="button"
        className="verify-btn"
        onClick={handleVerifyEmail}
        disabled={loading || timeLeft <= 0}
      >
        {loading ? "Đang xác nhận..." : "Xác nhận email"}
      </button>

      <p className="resend-text">
        Chưa nhận được mã?
        <button type="button" className="resend-btn" disabled={timeLeft > 0}>
          Gửi lại mã
        </button>
      </p>
    </div>
  );
};

export default VerifyEmailComponent;
