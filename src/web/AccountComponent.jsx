import React, { useEffect, useState } from 'react'
import { getProfile } from '../services/AuthService';

const AccountComponent = () => {
	const [user, setUser]= useState(null);
	useEffect(()=>{
		loadProfile();
	},[]);

	const loadProfile=async()=>{
		try {
			const res = await getProfile();
			setUser(res.data.data);
		} catch (error) {
			console.error("Lỗi lấy thông tin user:", error);
		}
	};
	if (!user) {
        return <p>Đang tải...</p>;
    }

  return (
	<div className="account-container">
	
	<div className="account-card">
	  
	  {/* Tiêu đề */}
	  <div className="account-title">
		
		<h2>Thông tin tài khoản</h2> <p>Quản lý thông tin cá nhân của bạn</p>
	  </div>
	  {/* Avatar */}
	  <div className="avatar-section">
		<div className="avatar">
			<img src={`https://ban-hang-production.up.railway.app/uploads/${user.imageUrl}`}
			style={{
				width:"75px",
                height: "75px",
                objectFit: "cover",
                borderRadius: "100%"
            }}
			></img>	
		</div>
		<div className="avatar-info">
		  
		  <h3> {user.name} </h3> <p>Thành viên</p>
		</div>
	  </div>
	  {/* Thông tin */}
	  <div className="account-info">
		
		<div className="form-group">
		  
		  <label>Họ và tên</label>
		  <input type="text" defaultValue= {user.name} />
		</div>
		<div className="form-group">
		  
		  <label>Email</label>
		  <input type="email" defaultValue= {user.email}  />
		</div>
		<div className="form-group">
		  
		  <label>Số điện thoại</label>
		  <input type="text" defaultValue= {user.phone}  />
		</div>
		<div className="form-group">
		  
		  <label>Địa chỉ</label>
		  <input type="text" defaultValue= {user.address}  />
		</div>
	  </div>
	  {/* Button */}
	  <div className="account-actions">
		
		<button className="btn-save"> Lưu thay đổi </button>
		<button className="btn-password"> Đổi mật khẩu </button>
	  </div>
	</div>
  </div>
  )
}

export default AccountComponent