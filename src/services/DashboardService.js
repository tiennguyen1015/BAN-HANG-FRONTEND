import axiosClient from "./axiosClient"

export const getDashboard=()=>{
	return axiosClient.get(`/dashboard`);
}