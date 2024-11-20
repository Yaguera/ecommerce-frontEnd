import Image from "next/image"
import logo from "../../public/logo.png"
import { UserRoundIcon, ShoppingCart } from "lucide-react"


const Header = () => {
  return (
    <div className="p-4 flex justify-between mx-5 px-10 rounded-b-xl bg-[#b5b5b5]">
      <Image src={logo} width={110} height={45} alt="logo"/>
      <nav className="flex items-center">
        <ul className="flex gap-4 items-center ">
            <li className="text-black font-semibold flex gap-4 bg-slate-400 p-3 rounded-lg"><ShoppingCart/> <span id="quantidade" className="font-semibold">0</span></li>
            <li className="md:flex hidden text-black font-semibold  gap-3"><UserRoundIcon/> Entrar</li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
