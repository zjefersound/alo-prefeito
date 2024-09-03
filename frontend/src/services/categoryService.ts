import { Category } from "../models/Category";
import { IPaginatedResponse } from "../models/IPaginatedResponse";
import { api } from "./api";

const path = '/categories';
interface CategoryResponse extends IPaginatedResponse {
  categories: Category[];
}

function getAll() {
  return api.get<CategoryResponse>(path)
}


export const categoryService = {
  getAll,
}