import axios from "axios";

const productAPI = axios.create({
  baseURL: "https://localhost:7284/api/Product",
});

export const getProducts = async () => await (await productAPI.get("/")).data;

export const getProduct = async (id) =>
  await (
    await productAPI.get(`/${id}`)
  ).data;

export const createProduct = async (product) =>
  await (
    await productAPI.post("/", product, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  ).data;

export const editProduct = async (product) =>
  await (
    await productAPI.put(`/${product.id}`, product)
  ).data;

export const deleteProduct = async (id) =>
  await (
    await productAPI.delete(`/${id}`)
  ).data;
