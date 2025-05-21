// import Header from "@ui/header";
// import Hero from "@ui/hero";
export default function Land() {
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
    </div>
  );
}
import DropdownMenu from "@ui/dropDownMenu";
import { motion } from "framer-motion";
import Hero from "@ui/hero";
function Header() {
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
import { Button } from "@ui/button";
import Link from "next/link";

function Hero() {
  return (
    <div className="mt-12" id="heroTextWrapper">
      <h1 className="text-5xl">
        News and{" "}
        <span className="inline-block">
          <span className="bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            entertainment
          </span>
          <span className="block h-1 bg-gradient-to-r from-pink-500 to-yellow-500 mt-1"></span>
        </span>
      </h1>{" "}
      <div className="fixed -mt-24 w-screen h-screen bg-[radial-gradient(circle_at_bottom_right,_rgba(255,0,128,0.3),_transparent_70%)] flex flex-col justify-center items-center">
        <Link href="/articleList">
          <Button className="px-8 py-4 h-[60px] text-base">
            Read articles!
          </Button>
        </Link>
      </div>{" "}
    </div>
  );
}
