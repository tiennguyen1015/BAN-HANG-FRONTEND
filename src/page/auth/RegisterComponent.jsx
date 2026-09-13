import { useState } from "react";
import { register } from "../../services/AuthService"
const RegisterComponent = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }

		register(user)
        .then((response) => {
            // alert("Đăng ký thành công");
            alert(response.data.message);
        })
        .catch((error) => {
            console.log(error.response.data);
            alert(error.response.data.message);
        });

        console.log(user);

        // TODO: Gọi API Register
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow">
                        <div className="card-header text-center">
                            <h3>Đăng ký tài khoản</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={user.name|| ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={user.email|| ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={user.phone|| ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={user.address|| ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={user.password|| ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Nhập lại mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={user.confirmPassword|| ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="btn btn-primary w-100">
                                    Đăng ký
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RegisterComponent;