"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export default function AutoCurrentAffairs() {

  const [loading, setLoading] =
    useState(false);

  const fetchNews = async () => {

    try {

      setLoading(true);

      const response = await fetch(

        `https://newsapi.org/v2/everything?q=India&sortBy=publishedAt&language=en&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`

      );

      const data = await response.json();
      console.log(data);

      if (!data.articles) {

            console.log(data);

            alert("Failed to fetch news");

            setLoading(false);

            return;

            }

            const articles =
            data.articles.slice(0, 5);

      for (const article of articles) {

        const docRef = await addDoc(
          collection(
            db,
            "currentAffairs"
            
          ),
          
          
          {

            title:
              article.title || "",

            description:
              article.description || "",

            category:
              "Daily News",

            important: true,

            date:
            new Date().toDateString(),

            createdAt:
            new Date().getTime(),

          }
        );
         console.log("Saved document:", docRef.id);

      }

      alert(
        "Daily current affairs added"
      );

    } catch (error) {

      console.log(error);

      alert("Error fetching news");

    }

    setLoading(false);

  };

  return (

    <button
      onClick={fetchNews}
      className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition"
    >

      {loading
        ? "Fetching..."
        : "Auto Fetch Current Affairs"}

    </button>

  );

}