import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listCaregory } from "../../services/CategoryService";
import { jwtDecode } from "jwt-decode";
import { getProfile, logout, refreshToken } from "../../services/AuthService";

const HeaderComponent = () => {
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();

  // const decoded = jwtDecode(token);
  // const username = decoded.sub;
  // console.log(username);

  const [username, setUsername] = useState("");
  useEffect(() => {
    const checkToken = async () => {
      console.log("CHECK TOKEN RUN");
      const token = localStorage.getItem("token");
      // Lấy Refresh Token
      const refresh = localStorage.getItem("refreshToken");
      console.log("REFRESH TOKEN:", refresh);
      console.log("TOKEN:", token);

      if (!token || !refresh) {
        console.log("Không có access token");
        return;
      }

      try {
        const decoded = jwtDecode(token);

        console.log("DECODED:", decoded);
        console.log("EXP:", decoded.exp);
        console.log("NOW:", Date.now());
        console.log("TOKEN HẾT HẠN:", decoded.exp * 1000 < Date.now());
        setUsername(decoded.sub);
      } catch (error) {
        console.log(error);
        console.error("Refresh token không hợp lệ:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("user");
        setUsername("");
        navigate("/loginWeb");
      }
    };

    checkToken();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };
  const handleLogOutClick = (e) => {
    e.preventDefault();
    logout();
    setUsername("");
    navigate("/home");
  };

  const token = localStorage.getItem("token");

  const getCategory = () => {
    listCaregory().then((res) => {
      setCategorys(res.data.data.content);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleCartClick = (e) => {
    e.preventDefault(); // Ngăn Link chuyển trang mặc định
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/cart");
      return;
    }
    navigate("/loginWeb");
  };

  const handleOrderClick = (e) => {
    e.preventDefault(); // Ngăn Link chuyển trang mặc định
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/order");
      return;
    }
    navigate("/loginWeb");
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const [user, setUser] = useState(null);
  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.data);
    } catch (error) {
      console.error("Lỗi lấy thông tin user:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    loadProfile();
  }, []);

  return (
    <header>
      <div className="top-header">
        <div className="logo">
          <Link to="/Home">🛒 ShopTech</Link>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Bạn cần tìm gì hôm nay..." />

          <button>🔍</button>
        </div>

        <div className="header-right">
          {token ? (
            <div className="cart-menu">
              {" "}
              <Link className="cart-link" onClick={handleAccountClick}>
                {" "}
                {user?.imageUrl ? (
                  <img
                    src={`https://ban-hang-production.up.railway.app/uploads/${user.imageUrl}`}
                    alt="Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <span>👤</span>
                )}{" "}
                <span>{username}</span>{" "}
              </Link>{" "}
              <div className="cart-dropdown">
                {" "}
                <Link onClick={handleLogOutClick}>Đăng xuất</Link>{" "}
              </div>{" "}
            </div>
          ) : (
            <>
              {" "}
              <Link to="/loginWeb">
                {" "}
                👤 <span>Đăng nhập</span>{" "}
              </Link>{" "}
              <Link to="/Register">
                {" "}
                📝 <span>Đăng ký</span>{" "}
              </Link>{" "}
            </>
          )}

          <div className="cart-menu">
            <Link onClick={handleCartClick} className="cart-link">
              🛒
              <span>Giỏ hàng</span>
            </Link>

            <div className="cart-dropdown">
              <Link onClick={handleOrderClick}>📦 Đơn mua</Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="menu">
        <Link to="/home">Trang chủ</Link>

        {categorys.map((category) => (
          <Link
            key={category.id}
            to={`/productPage?category=${category.name}-cat.${category.id}`}
          >
            {category.name}
          </Link>
        ))}

        <Link to="/contact">Liên hệ</Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;
