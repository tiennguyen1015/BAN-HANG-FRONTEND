import axios from "axios";
import axiosClient from "./axiosClient";

const REST_API_BASE_URL = "https://ban-hang-production.up.railway.app";

export const updateCartItemQuantity = (cartItemId, quantity) => {
    return axiosClient.put(
        `/cart/items/${cartItemId}`,
        { quantity }
    );
};