"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import Header from "@ui/header";
import Footer from "@ui/footer";
import Link from "next/link";
// imp  ort { ArticleCard } from "@ui/articleCard";
import Head from "next/head";
// import Share from "@ui/share";
// import SocialCard from "@ui/socialCard";

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
            className="ml-auto flex"
            id={id}
            imageUrl={currentArticle.imgUrl}
          />
        </div>
        <p className="text-sm text-gray-500">{currentArticle.date}</p>
        <Image
          src={currentArticle.imgUrl}
          alt=""
          width={800}
          height={400}
          className="my-4 w-full rounded"
        />
        <p>{currentArticle.subHeading}</p>
        <p>{currentArticle.content}</p>

        <div className="flex justify-center items-center mt-12">
          <p>End</p>
        </div>

        <hr className="my-4 border-t border-gray-300" />

        <div className="flex-wrap gap-2 mt-20 mb-20 flex justify-center items-center">
          <fieldset>
            <legend className="text-3xl font-bold text-gray-700 -ml-6 mb-6">
              Share this article <span>❤️</span>
            </legend>
            <div className="flex-wrap gap-2 scale-110 flex justify-center items-center">
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

        <div className="flex flex-wrap gap-4 justify-center mt-24">
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
import React from "react";
import Image from "next/image";

type Props = {
  imgUrl: string;
  Heading: string;
  subHeading: string;
  date: string;
  rating: number;
};

 function ArticleCard({
  imgUrl,
  Heading,
  subHeading,
  date,
  rating,
}: Props) {
  return (
    <div
      className="gap-5 justify-center items-center w-[100%] h-auto flex flex-wrap"
      id="articlesWrapper"
    >
      <div
        className="bg-white w-[250px] rounded-xl shadow"
        aria-label="card-overlay-v3"
      >
        <div className="w-full rounded-xl h-[250px] flex-shrink-0 relative overflow-hidden">
          <Image
            src={imgUrl}
            alt="The grand resort"
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col flex-1 p-5">
          <div className="pb-5 mb-5 border-b border-gray-200">
            <h3 className="mb-1 text-lg font-bold">{Heading}</h3>
            <span className="text-sm">{subHeading}</span>
          </div>
          <div className="flex items-center justify-between w-full ml-auto">
            <div className="text-sm text-slate-400">{date}</div>
            <div className="flex items-center gap-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold">{rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Popover, PopoverTrigger, PopoverContent } from "@ui/popover";
import { Button } from "@ui/button";
import { Share2, Twitter, Mail, Link } from "lucide-react";
import { Command, CommandItem } from "@ui/command"; // Assuming you're using a Command UI component
 function Share({ id, className }) {
  const shareUrl = `https://nannuru.com/articles/${id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={className + " max-h-12"}>
          <Share2 className="w-4 h-1 mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 space-y-2">
        <Command>
          <CommandItem onSelect={copyToClipboard}>
            <Link className="w-4 h-4 mr-2" />
            Copy Link
          </CommandItem>
          <CommandItem
            onSelect={() =>
              window.open(
                `https://twitter.com/share?url=${shareUrl}&text=${document.title}&via=nannuru`,
                "_blank"
              )
            }
          >
            <Twitter className="w-4 h-4 mr-2 text-blue-500" />
            Share on Twitter
          </CommandItem>
          <CommandItem
            onSelect={() =>
              window.open(
                `mailto:?subject=Check this out&body=${shareUrl}`,
                "_blank"
              )
            }
          >
            <Mail className="w-4 h-4 mr-2" />
            Share via Email
          </CommandItem>
          <CommandItem
            onSelect={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=https://nannuru.com/articles/${id}`,
                "_blank"
              )
            }
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              width={16}
              height={16}
              className="mr-2"
            />
            Share on Facebook
          </CommandItem>

          <CommandItem
            onSelect={() =>
              window.open(
                `https://api.whatsapp.com/send?text=${shareUrl}`,
                "_blank"
              )
            }
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              width={16}
              height={16}
              className="mr-2"
            />
            Share on WhatsApp
          </CommandItem>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@ui/card";

function SocialCard({ linkUrl, imgUrl, name }) {
  return (
    <>
      <Head>
        <meta property="og:title" content={name} />
        <meta property="og:description" content={`Check out ${name} on this page.`} />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:url" content={linkUrl} />
      </Head>

      <Link href={linkUrl} target="_blank">
        <div className="flex items-center gap-2 bg-white hover:bg-gray-100 px-4 py-4 rounded-xl shadow-sm outline outline-slate-200 transition-all w-fit">
          <div className="relative min-w-6 w-8 min-h-6 h-8">
            <Image src={imgUrl} alt={name} fill className="object-contain" />
          </div>
          <span className="font-medium text-sm text-black">{name}</span>
        </div>
      </Link>
    </>
  );
}