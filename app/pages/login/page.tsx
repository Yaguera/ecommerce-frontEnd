"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const{setUser} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      const { token, user } = response.data;

      // Salva o token no localStorage (ou cookies, dependendo do uso)
      localStorage.setItem("authToken", token);
      setUser(user);

      // Redireciona o usuário após o login
      router.push("/");
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data?.message || "Erro ao se cadastrar");
        } else {
          setErrorMessage("Erro ao se cadastrar");
        }
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-white mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
        >
          Entrar
        </button>
        <p className="text-gray-400 text-sm mt-4">
          Não tem uma conta?{" "}
          <a href="/pages/signup" className="text-green-500 hover:underline">
            Cadastre-se
          </a>
        </p>
      </form>
    </div>
  );
}
