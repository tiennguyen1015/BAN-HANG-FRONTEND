import axios from "axios";
import axiosClient from "./axiosClient";

const REST_API_BAES_URL = 'http://localhost:8080/auth';

// const token = localStorage.getItem("token");
// axios.get("http://localhost:8080/users", {
// 	headers: {
// 	  Authorization: `Bearer ${token}`
// 	}
//   });
export const login=(loginData)=>{
	return axiosClient.post(`/auth/login`,loginData)
}


export const register=(users)=>{
	return axiosClient.post(`/auth/register`,users)
}


export const logout=()=>{
	return axiosClient.post(`auth/logout`);
}

export const refreshToken = (refreshToken) => {
    return axios.post(`${REST_API_BAES_URL}/refresh`,null, {
		
		params: {
			refreshToken: refreshToken
		}
    });
};

export const getProfile=()=>{
	return axiosClient.get(`/users/me`);
}
