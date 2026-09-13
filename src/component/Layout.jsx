import React from 'react'
import { Outlet } from "react-router-dom";

import { useNavigate } from 'react-router-dom'

function Layout(){

	const navigate = useNavigate();
	function user() {
		navigate("/users");
	}
  function product() {
		navigate("/products");
	}
  function category(){
    navigate("/categorys")
  }
  function dashboard(){
    navigate("/dashboard")
  }
  function order(){
    navigate("/listorder")
  }

  return (
	<div className="wrapper">
    {/* Sidebar */}
    <div className="sidebar">
      <div className="logo">
        <h2>LOGO</h2>
      </div>
      <ul>
        <button onClick={dashboard}>Dashboard</button>
        <button onClick={user}>Users</button>
        <button onClick={product}>Products</button>
        <button onClick={category}>Category</button>
        <button onClick={order}>Orders</button>
        <button>Settings</button>
      </ul>
    </div>
    {/* Main */}
    <div className="main">
      {/* Topbar */}
      <div className="topbar">
		<div className='cate'>
			<ul>
      <button>Dashboard</button>
        <button>Users</button>
        <button>Products</button>
        <button>Orders</button>
        <button>Reports</button>
        <button>Settings</button>
			</ul>
		</div>
		<div className=' auth'>
			<ul>
				<li>Login</li>
				<li>Logout</li>
			</ul>
		</div>
      </div>
      {/* Content */}
      <div className="content">
    	<Outlet/>
      </div>
    </div>
  </div>
  )
}

export default Layout