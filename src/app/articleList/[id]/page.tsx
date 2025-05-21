"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // <- use this for dynamic route like /articles/[id]
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import Header from "@ui/header";
import Footer from "@ui/footer";
import Link from "next/link";
import { ArticleCard } from "@ui/articleCard";
import Head from "next/head";
import Share from "@ui/share";
import SocialCard from "@ui/socialCard";

export default function ArticleRead() {
  const [articles, setArticles] = useState<any[]>([]);
  const params = useParams();
  const id = params?.id;

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

  const currentArticle = articles.find((a) => a.id === Number(id));
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  if (!currentArticle) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <meta property="og:title" content={currentArticle.Heading} />
        <meta property="og:description" content={currentArticle.subHeading} />
        <meta property="og:image" content="https://bit.ly/3zzCTUT" />
        <meta
          name="twitter:image"
          content={`https://nannuru.com${currentArticle.imgUrl}`}
        />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentArticle.Heading} />
        <meta name="twitter:description" content={currentArticle.subHeading} />
      </Head>

      <Header />
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex">
          <h1 className="text-2xl font-bold">{currentArticle.Heading}</h1>
          <Share
            className="ml-auto w-auto h-auto flex"
            id={id}
            imageUrl={currentArticle.imgUrl}
          />
        </div>
        <p className="text-sm text-gray-500">{currentArticle.date}</p>
        <Image
          src={currentArticle.imgUrl}
          alt=""
          className="my-4 w-full rounded"
        />
        <p>{currentArticle.subHeading}</p>
        <p>{currentArticle.content}</p>

        <div className="flex justify-center items-center">
          <p className="mt-12">End</p>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        <div className="flex-wrap gap-2 mt-[80px] mb-[80px] flex justify-center items-center w-full h-auto">
          <fieldset>
            <legend className="text-3xl font-bold text-gray-700 -ml-6 mb-6">
              Share this article <span>❤️</span>
            </legend>
            <div className="flex-wrap gap-2 scale-[1.2] flex justify-center items-center w-full h-auto">
              <SocialCard
                linkUrl={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                imgUrl="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                name="facebook"
              />
              <SocialCard
                linkUrl={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  currentUrl
                )}`}
                imgUrl="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                name="whatsapp"
              />
            </div>
          </fieldset>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-[100px]">
          {articles.map((a) => (
            <Link href={`/articles/${a.id}`} key={a.id}>
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
      </div>
      <Footer />
    </>
  );
}
