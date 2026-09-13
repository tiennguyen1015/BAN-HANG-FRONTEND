import React, { useState } from "react";
import { login } from "../../services/AuthService"; 

import { useNavigate } from 'react-router-dom'
function LoginComponent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
      e.preventDefault();
  
      const loginData = {
          email,
          password
      };

  
      login(loginData)
          .then((response) => {

            localStorage.setItem("token", response.data.data.accessToken);
              if (rememberMe) {
                  localStorage.setItem("email", email);
                  localStorage.setItem("password", password);
              } else {
                  localStorage.removeItem("email");
                  localStorage.removeItem("password");
              }
  
              alert("Đăng nhập thành công");
              navigate("/users");
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
  };

    return (
        <div className="container mt-5">
            <div className="card col-md-6 offset-md-3">
                <div className="card-body">
                    <h2 className="text-center mb-4">Đăng nhập trang quản trị</h2>

                    <form onSubmit={handleLogin}>

                        <div className="mb-3">
                            <label className="form-label">
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
                                />
                                <label htmlFor="rememberMe" className="ms-2">
                                    Nhớ mật khẩu
                                </label>
                            </div>

                            <a href="/forgot-password">
                                Quên mật khẩu?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Đăng nhập
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;