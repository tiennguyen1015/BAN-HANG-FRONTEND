import axios from "axios";
import axiosClient from "./axiosClient";

export const getCartByUserId = () => {
    return axiosClient.get(`/cart`);
};

export const deleteCartItem = (orderItem) => {
    return axiosClient.delete(`/cart/items/${orderItem}`);
};