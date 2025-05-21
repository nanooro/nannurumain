"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ArticleCard } from "@ui/articleCard";
// import Header from "@ui/header";
// import Footer from "@ui/footer";

import Link from "next/link";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("Nannuru_articles_table")
        .select("*");

      if (error) console.error(error);
      else setArticles(data);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        {articles.map((a) => (
          <Link href={`/articleList/${a.id}`} key={a.id}>
            <ArticleCard
              imgUrl={a.imgUrl}
              Heading={a.Heading}
              subHeading={a.subHeading}
              date={a.date}
              rating={a.rating}
            />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}
import DropdownMenu from "@ui/dropDownMenu";
import { motion } from "framer-motion";
import Hero from "@ui/hero";
import Link from "next/link";
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
 function Footer() {
  return <div className="mt-24"></div>;
}
function Footer() {
  return <div className="mt-24"></div>;
}
