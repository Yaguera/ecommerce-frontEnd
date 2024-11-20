import Image from "next/image"
import logo from "../../public/logo.png"
import { UserRoundIcon, ShoppingCart } from "lucide-react"


const Header = () => {
  return (
    <div className="fixed w-full top-0 z-50 justify-center flex">
        <div className="p-4 rounded-b-xl  bg-[#b5b5b5] flex w-[95%] justify-between">
        <Image src={logo} width={110} height={45} alt="logo"/>
        <nav className="flex items-center">
            <ul className="flex gap-4 items-center ">
                <li className="text-black font-semibold flex gap-4 bg-slate-400 p-3 rounded-lg"><ShoppingCart/> <span id="quantidade" className="font-semibold">0</span></li>
                <li className="md:flex hidden text-black font-semibold  gap-3"><UserRoundIcon/> Entrar</li>
            </ul>
        </nav>
        </div>
    </div>
  )
}

export default Header
