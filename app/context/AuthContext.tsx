"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "../services/api";

type AuthContextType = {
  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await api.get("/user/profile");
          setUser(response.data); // Ajuste conforme o formato da resposta
        }
      } catch (error) {
        console.log(error)
        setUser(null); // Usuário não autenticado
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
