import DropdownMenu from "@ui/dropDownMenu";
import { motion } from "framer-motion";
import Hero from "@ui/hero";
import Link from "next/link";
export default function Header() {
  return (
    <>
      <div className="flex justify-start items-center m-1   w-auto h-[8vh] bg-white">
        <Link href="/">
          <h1 className="min-text-3xl text-5xl font-bold ">Nannuru</h1>
        </Link>
        <DropdownMenu className="ml-auto bg-gray-000" />
      </div>
    </>
  );
}
