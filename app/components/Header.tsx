"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { UserRoundIcon, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api"; // Importa o axios configurado

const Header = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user/profile"); // Endpoint para obter o usuário logado
        setUserName(response.data.name); // Ajuste conforme a estrutura da resposta da API
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        setUserName(null); // Garante que será null se não autenticado
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("authToken");

    // Limpa o estado do usuário
    setUserName(null);
  };

  return (
    <div className="fixed w-full top-0 z-50 justify-center flex">
      <div className="p-4 rounded-b-xl bg-[#b5b5b5] flex w-[95%] justify-between">
        <Image src={logo} width={110} height={45} alt="logo" />
        <nav className="flex items-center">
          <ul className="flex gap-4 items-center">
            {/* Carrinho */}
            <li className="text-black font-semibold flex gap-4 bg-slate-400 p-3 rounded-lg">
              <ShoppingCart /> <span id="quantidade" className="font-semibold">0</span>
            </li>

            {/* Verificar se o usuário está logado */}
            {userName ? (
              <>
                <li className="text-black font-bold text-2xl flex items-center gap-2">
                  <UserRoundIcon /> {userName}
                </li>
                <li className="text-slate-400 font-semibold">
                  <Link href="/">
                    <button
                      onClick={handleLogout} // Apenas remove o token, sem redirecionar explicitamente
                      className="bg-red-800 py-3 px-6 rounded-lg"
                    >
                      Sair
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <li className="md:flex hidden text-black font-semibold gap-3">
                <UserRoundIcon />
                <Link href="/pages/login">Entrar</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
