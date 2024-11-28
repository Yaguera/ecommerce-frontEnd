"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { UserRoundIcon, ShoppingCart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, setUser } = useAuth();

  const { cart } = useCart(); // Obtém o carrinho do contexto

  // Calcula o número total de itens no carrinho
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null); // Atualiza o estado global
  };

  return (
    <div className="fixed w-full top-0 z-50 justify-center flex">
      <div className="p-4 rounded-b-xl bg-[#b5b5b5] flex w-[95%] justify-between">
        <Link href="/">
          <Image src={logo} width={110} height={45} alt="logo" />
        </Link>
        <nav className="flex items-center">
          <ul className="flex gap-4 items-center">
            <Link href="pages/cart">
            <li className="text-black font-semibold flex gap-4 bg-slate-400 p-3 rounded-lg">
              <ShoppingCart /> <span id="quantidade" className="font-semibold">
                {totalItems}
              </span>
            </li>
            </Link>

            {user ? (
              <>
                <li className="text-black font-bold text-2xl flex items-center gap-2">
                  <UserRoundIcon /> {user.name}
                </li>
                <li className="text-slate-400 font-semibold">
                  <button
                    onClick={handleLogout}
                    className="bg-red-800 py-3 px-6 rounded-lg"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <Link href="/pages/login">
                <li className="md:flex hidden text-black font-semibold gap-3">
                <UserRoundIcon />
                Entrar
              </li>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
