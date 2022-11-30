import axios from "axios";

const brandAPI = axios.create({ baseURL: "https://localhost:7284/api/Brand" });

export const getBrands = async () => {
  const res = await brandAPI.get("/");
  return res.data;
};

export const getBrand = async (id) => await brandAPI.get(`${id}`);

export const createBrand = async (brand) => await brandAPI.post("/", brand);

export const editBrand = async (brand) =>
  await brandAPI.put(`/${brand.id}`, brand);

export const deleteBrand = async (id) => await brandAPI.delete(`/${id}`);
