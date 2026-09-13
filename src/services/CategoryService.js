import axios from "axios";
import axiosClient from "./axiosClient";


const REST_API_BAES_URL = 'http://localhost:8080/categories';

export const listCaregory=(searchKeyword, page,size)=>{
	return axiosClient.get("/categories",{
		params:{
			searchKeyword,
            page,
            size
		}
	}
	)
}

export const getCategoryById=(id)=>{
	return axiosClient.get(`/categories/${id}`);
}

export const save = (categories) => {
    return axiosClient.post(
        `/categories`,
        categories
    );
}

export const updateCategory=(id,categories)=>{
	return axiosClient.put(`/categories/${id}`,categories);
}

export const deleteCategory=(id)=>{
	return axiosClient.delete(`/categories/${id}`);
}