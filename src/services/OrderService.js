import axios from "axios";
import axiosClient from "./axiosClient";

const API_URL = "http://localhost:8080";

export const createOrder = (orderRequest) => {
  return axiosClient.post(`/order`, orderRequest);
};

export const getOrder = () => {
  return axiosClient.get(`/order`);
};

export const deleteOrderItem = (orderId) => {
  return axiosClient.put(`/orders/${orderId}/cancel`, {});
};

export const buyAgain = (orderId) => {
  return axiosClient.post(`/orders/${orderId}/buy-again`);
};

export const getOrderByStatus = (status) => {
  return axiosClient.get(`/orders/status/${status}`);
};
export const getOrderByUser = () => {
  return axiosClient.get(`/orderByUser`);
};

export const getOrderToday = () => {
  return axiosClient.get(`/orders/today`);
};

export const getAllOrder = (searchKeyword, page, size) => {
  return axiosClient.get(`/allorder`, {
    params: {
      searchKeyword,
      page,
      size,
    },
  });
};

export const updateOrderStatus = (orderId, status) => {
  return axiosClient.put(`/orders/${orderId}/status/${status}`);
};

export const getOrderById = (orderId) => {
  return axiosClient.get(`/order/${orderId}`);
};
export const getOrderByIdAndUser = (orderId) => {
  return axiosClient.get(`/order/user/${orderId}`);
};
