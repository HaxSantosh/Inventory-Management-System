import axios from "axios";
import type { Category } from "../types/category";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Get all categories
export const getCategories = async () : Promise<Category[]> => {
  const res = await axios.get<Category[]>(`${BASE_URL}/category`);
  return res.data;
};

// Create category
export const createCategory = async (data: Pick<Category, "name">) => {
  const res = await axios.post<Category>(`${BASE_URL}/category`, data);
  return res.data;
};

// Update category

export const updateCategory = async(id  : number, data : Partial<Category>) : Promise<void> => {
  const res = await axios.put(`${BASE_URL}/category/${id}`, data);
}

// Delete category
export const deleteCategory = async (id: number) : Promise<void> => {
  await axios.delete(`${BASE_URL}/category/${id}`);
};
