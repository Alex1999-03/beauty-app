import axios from "axios";

const promotionAPI = axios.create({
  baseURL: "https://localhost:7284/api/Promotion",
});

export const getPromotions = async () =>
  await (
    await promotionAPI.get("/")
  ).data;

export const getPromotion = async (id) =>
  await (
    await promotionAPI.get(`/${id}`)
  ).data;

export const createPromotion = async (promotion) =>
  await (
    await promotionAPI.post("/", promotion)
  ).data;

export const editPromotion = async (promotion) =>
  await (
    await promotionAPI.put(`${promotion.id}`, promotion)
  ).data;

export const deletePromotion = async (id) =>
  await (
    await promotionAPI.delete(`/${id}`)
  ).data;
