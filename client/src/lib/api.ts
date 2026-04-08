import { apiRequest } from "./queryClient";
import type { Monument, InsertMonument } from "@shared/schema";

export type AuthUser = {
  id: string;
  username: string;
  role: string;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await apiRequest("POST", "/api/auth/login", { username, password });
  return res.json();
}

export async function register(username: string, password: string): Promise<AuthResponse> {
  const res = await apiRequest("POST", "/api/auth/register", { username, password, role: "enthusiast" });
  return res.json();
}

export async function getMe(): Promise<AuthUser> {
  const res = await apiRequest("GET", "/api/auth/me");
  return res.json();
}

export async function logout(): Promise<void> {
  await apiRequest("POST", "/api/auth/logout");
}

export async function getMonuments(): Promise<Monument[]> {
  const res = await apiRequest("GET", "/api/monuments");
  return res.json();
}

export async function getMonument(id: string): Promise<Monument> {
  const res = await apiRequest("GET", `/api/monuments/${id}`);
  return res.json();
}

export async function createMonument(monument: InsertMonument): Promise<Monument> {
  const res = await apiRequest("POST", "/api/monuments", monument);
  return res.json();
}

export async function updateMonument(id: string, monument: Partial<InsertMonument>): Promise<Monument> {
  const res = await apiRequest("PATCH", `/api/monuments/${id}`, monument);
  return res.json();
}

export async function deleteMonument(id: string): Promise<void> {
  await apiRequest("DELETE", `/api/monuments/${id}`);
}