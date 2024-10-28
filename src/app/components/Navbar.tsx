import Link from "next/link"
import { ModeToggle } from "./ModeToggle"


const Navbar = () => {
  return (
    <nav className="border-b w-full relative flex items-center justify-between  max-w-screen-2xl mx-auto px-4 py-5">
        <Link href='/' className="font-bold text-3xl">Your<span className="text-primary">Blog</span> </Link>

        <ModeToggle/>
    </nav>
  )
}

export default Navbar