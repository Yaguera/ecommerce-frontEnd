"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";
import axios from "axios";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Para o nome do usuário
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/user/signup", { email, password, name });

      // Redireciona para a página de login após o cadastro
      router.push("/pages/login");
    }catch (error: unknown) {
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
        <h1 className="text-2xl font-bold text-white mb-4">Cadastro</h1>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="mb-4">
          <label className="block text-white mb-2">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
        >
          Cadastrar
        </button>
        <p className="text-gray-400 text-sm mt-4">
          Já tem uma conta?{" "}
          <a href="/pages/login" className="text-blue-500 hover:underline">
            Faça login
          </a>
        </p>
      </form>
    </div>
  );
}