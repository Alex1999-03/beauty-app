import axios from "axios";

const brandAPI = axios.create({
  baseURL: "https://localhost:7284/api/Brand",
});

export const getBrands = async () => await (await brandAPI.get("/")).data;

export const getBrand = async (id) => await (await brandAPI.get(`${id}`)).data;

export const createBrand = async (brand) => await (await brandAPI.post("/", brand)).data;

export const editBrand = async (brand) =>
  await (await brandAPI.put(`/${brand.id}`, brand)).data;

export const deleteBrand = async (id) => await (await brandAPI.delete(`/${id}`)).data;
