// src/api/emergency.ts
import API from "./api";

export const getActiveEmergencies = () =>
  API.get("/emergencies/active");

export const getUserProfile = () =>
  API.get("/users/me");

export const getNearbyHospitals = (lat: number, lng: number) =>
  API.get(`/hospitals/nearby?lat=${lat}&lng=${lng}`);