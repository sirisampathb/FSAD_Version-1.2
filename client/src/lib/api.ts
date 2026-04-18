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

export async function register(username: string, password: string, mobile?: string, role: string = "enthusiast"): Promise<AuthResponse> {
  const res = await apiRequest("POST", "/api/auth/register", { username, password, mobile, role });
  return res.json();
}

export async function sendOtp(mobile: string): Promise<{ message: string; error?: string }> {
  const res = await apiRequest("POST", "/api/auth/send-otp", { mobile });
  return res.json();
}

export async function verifyOtp(mobile: string, otp: string): Promise<AuthResponse> {
  const res = await apiRequest("POST", "/api/auth/verify-otp", { mobile, otp });
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