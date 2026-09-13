import axios from "axios";
import axiosClient from "./axiosClient";

const REST_API_BAES_URL= 'http://localhost:8080/products';

export const listProducts=(searchKeyword, page, size)=> {
	return axiosClient.get("/products",{
		params:{
			searchKeyword,
			page,
			size
		}
	})
}


export const createProduct = (formData) => {
    return axiosClient.post("/products",
        formData
    );
}

export const updateProduct = (id,formData) => {
    return axiosClient.put(`/products/${id}`,
        formData
    );
}

export const deleteProduct=(id)=>{
    return axiosClient.delete(`/products/${id}`);
}

export const getProductById=(id)=>{
	return axiosClient.get(`/products/${id}`);
}

export const getProductByCategoryId=(id)=>{
    return axiosClient.get(`/products/productPage/${id}`);
}

export const addToCart=(productId,quantity)=>{
    return axiosClient.post( `/addCart`,{
        productId,quantity
    }
);
};

export const getProductStock=()=>{
    return axiosClient.get(`/products/productStock`);
}

