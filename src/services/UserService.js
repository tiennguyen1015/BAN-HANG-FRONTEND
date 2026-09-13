import axios from "axios";
import api from "../page/config/AxiosConfig";
import axiosClient from "./axiosClient";

const REST_API_BAES_URL = 'http://localhost:8080/users';


export const listUser = (searchKeyword, page, size) => {
    return axiosClient.get("/users", {
        params: {
            searchKeyword,
            page,
            size
        }
    });
};


export const listRole = (roleFilterDTO, page, size) => {
   
    return axiosClient.get('/roles', {
        params: {
            ...roleFilterDTO,
            page,
            size
        }
    });
};

export const save=(users)=>{
	return  axiosClient.post(`/users`,users)
}

export const getUserById=(id)=>{
	return axiosClient.get(`/users/${id}`);
}


export const updateUser=(id,user)=>{
	return axiosClient.put(`${REST_API_BAES_URL}/${id}`,user);
}


export const deleteUser=(id)=>{
	return axiosClient.delete(`/users/${id}`);

}
  