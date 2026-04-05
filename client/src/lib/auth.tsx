import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getMe, login as loginApi, logout as logoutApi, register as registerApi, type AuthUser } from "./api";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  register: (username: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((user) => setUser(user))
      .catch(() => {
        localStorage.removeItem("authToken");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const response = await loginApi(username, password);
    localStorage.setItem("authToken", response.token);
    setUser(response.user);
    return response.user;
  };

  const register = async (username: string, password: string) => {
    const response = await registerApi(username, password);
    localStorage.setItem("authToken", response.token);
    setUser(response.user);
    return response.user;
  };

  const logout = async () => {
    await logoutApi();
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
