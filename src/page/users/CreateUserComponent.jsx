import { useEffect, useState } from "react";
import "../../assets/css/CreateUserComponent.css"; 
import { useNavigate } from 'react-router-dom'
import { save,listRole} from "../../services/UserService";

function CreateUserComponent() {

  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address:"",
    password:"",
    role:{
      id:""
    }
  });

  const roleFilter = {
    id:"",
    searchKeyword: "",
    name: "",
    description: ""
};

    useEffect(()=> {
      const token = localStorage.getItem("token");
          if (!token) {
              navigate("/login");
              return;
          }

          listRole()
          .then(res => {
              setRoles(res.data.data.content);
          });
        },[])

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      setUser({
        ...user,
        role: {
          id: value
        }
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const saveUser = (e) => {
    e.preventDefault();

    console.log(user);

    // Gọi API tại đây
    save(user)
        .then(res => {
          alert(res.data.message);
          // alert("Thêm người dùng thành công");
          navigate("/users");
        })
        .catch(error => {
          console.log(error.response.data);
          alert(error.response.data.message);
        });
  };

  return (
   <div className="conten">
	<div className="card">
      <h2>Thêm Người Dùng</h2>

      <form onSubmit={saveUser}>
        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />

            {/* {emailError && (
              <span style={{ color: "red" }}>
                {emailError}
              </span>
            )} */}

        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>
        <div className="form-group">
          <label>địa chỉ</label>
          <input
            type="address"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
          />
        </div>
        <div className="form-group">
          <label>mật khẩu</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu"
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select
              name="role"
              value={user.role.id}
              onChange={handleChange}
            >
              <option value="">-- Chọn quyền --</option>
              {roles.map(role => (
                <option
                    key={role.id}
                    value={role.id}
                >
                    {role.name}
                </option>
              ))}
             
            </select>
        </div>


        <button type="submit">Lưu</button>
      </form>
	  </div>
    </div>
  );
}

export default CreateUserComponent;

