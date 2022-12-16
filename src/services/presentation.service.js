import axios from "axios";

const presentationAPI = axios.create({
  baseURL: "https://localhost:7284/api/Presentation",
});

export const getPresentations = async () => await (await presentationAPI.get("/")).data;

export const getPresentation = async (id) =>
  await (await presentationAPI.get(`/${id}`)).data;

export const createPresentation = async (presentation) =>
  await (await presentationAPI.post("/", presentation)).data;

export const putPrsentation = async (presentation) =>
  await (await presentationAPI.put(`/${presentation.id}`, presentation)).data;

export const deletePresentation = async (id) =>
  await (await presentationAPI.delete(`/${id}`)).data;
