import axios from "axios";

const categoryAPI = axios.create({
  baseURL: "https://localhost:7284/api/Category",
});

export const getCategories = async () => await (await categoryAPI.get("/")).data;

export const getCategory = async (id) => await (await categoryAPI.get(`/${id}`)).data;

export const postCategory = async (category) =>
  await (await categoryAPI.post("/", category)).data;

export const putCategory = async (category) =>
  await (await categoryAPI.put("/", category)).data;

export const deleteCategory = async (id) =>
  await (await categoryAPI.delete(`${id}`, id)).data;
