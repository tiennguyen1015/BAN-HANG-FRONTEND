import axios from "axios";
import axiosClient from "./axiosClient";

const REST_API_BASE_URL = "http://localhost:8080";

export const updateCartItemQuantity = (cartItemId, quantity) => {
    return axiosClient.put(
        `/cart/items/${cartItemId}`,
        { quantity }
    );
};