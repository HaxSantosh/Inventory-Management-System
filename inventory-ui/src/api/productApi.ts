import axios from "axios";
import type { Product } from "../types/product";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🔹 Get all products
export const getProducts = async () : Promise<Product[]> => {
  const res = await axios.get<Product[]>(`${BASE_URL}/product`);
  return res.data;
};

// 🔹 Get product by id
export const getProductById = async (id: number) : Promise<Product>=> {
  const res = await axios.get<Product>(`${BASE_URL}/product/${id}`);
  return res.data;
};

// Create product
export const createProduct = async (data: Omit<Product, "id">) : Promise<Product> => {
  const res = await axios.post<Product>(`${BASE_URL}/product`, data);
  return res.data;
};

// 🔹 Update product
export const updateProduct = async (id: number, data: Partial<Product>) : Promise<void> => {
  await axios.put(`${BASE_URL}/product/${id}`, data);
};

//  Delete product
export const deleteProduct = async (id: number) : Promise<void> => {
  await axios.delete(`${BASE_URL}/product/${id}`);
};


export const uploadProductImages = async (files: File[]) : Promise<string[]> => {
  if (!files.length) return [];
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const res = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};