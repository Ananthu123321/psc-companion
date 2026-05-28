"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/firebase/config";

interface CurrentAffair {
  id: string;
  title: string;
  category: string;
  description: string;
  important: boolean;
  date: string;
}

export default function CurrentAffairs({
  showAll = false,
}: {
  showAll?: boolean;
})  {

  const [affairs, setAffairs] =
    useState<CurrentAffair[]>([]);

  const [loading, setLoading] =
    useState(true);
  const [expandedId, setExpandedId] =
  useState<string | null>(null);

  const [search, setSearch] =
  useState("");

const [selectedCategory, setSelectedCategory] =
  useState("All");

  useEffect(() => {

    fetchCurrentAffairs();
    

  }, []);

  const fetchCurrentAffairs = async () => {

    try {

      const q = query(
      collection(db, "currentAffairs"),
      orderBy("createdAt", "desc")
    );

      const querySnapshot =
        await getDocs(q);
        console.log(querySnapshot.docs.length);

     const data = querySnapshot.docs.map(
  (doc) => {

    const firestoreData = doc.data() as Partial<CurrentAffair>;

    return {

      id: doc.id,

      title: firestoreData.title || "",

      category: firestoreData.category || "",

      description:
        firestoreData.description || "",

      important:
        firestoreData.important || false,

      date: firestoreData.date || "",

    };

  }
);
      setAffairs(data);

    } catch (error) {

      console.log(error);

    }

    setLoading(false);

  };
  const categories = [

  "All",

  ...new Set(
    affairs.map(
      (item) => item.category
    )
  ),

];
const filteredAffairs =
  affairs.filter((item) => {

    const matchesSearch =

      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =

      selectedCategory === "All" ||

      item.category ===
        selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );

  });

  return (

    <section className="mt-14">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-blue-700">
          Daily Current Affairs
        </h2>

        <button
          onClick={fetchCurrentAffairs}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Refresh
        </button>

      </div>

      {loading ? (

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">

          <p className="text-gray-600">
            Loading current affairs...
          </p>

        </div>

      ) : affairs.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-md p-8 text-center">

          <p className="text-gray-600">
            No current affairs added yet
          </p>

        </div>
        

      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">

            <input
              type="text"
              placeholder="Search current affairs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 border rounded-xl p-4 text-black"
            />

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="border rounded-xl p-4 text-black"
            >

              {categories.map((category) => (

                <option
                  key={category}
                  value={category}
                >

                  {category}

                </option>

              ))}

            </select>

          </div>
          
          <div className="grid md:grid-cols-2 gap-6">

          {filteredAffairs.slice(0, 4).map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
            >

              <div className="flex items-center justify-between">

                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">

                  {item.category}

                </span>

                <span className="text-gray-500 text-sm">

                  {item.date}

                </span>

              </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-5">

                {item.title}

              </h3>

              {item.important && (

                <div className="mt-3">

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">

                    Important for PSC

                  </span>

                </div>

              )}

              <p className="text-gray-600 mt-4">

               {expandedId === item.id
                  ? item.description
                  : item.description.length > 120
                    ? `${item.description.slice(0, 120)}...`
                    : item.description}

              </p>

             <button
                type="button"
                onClick={() => {

                  if (expandedId === item.id) {

                    setExpandedId(null);

                  } else {

                    setExpandedId(item.id);

                  }

                }}
                className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
              >

                {expandedId === item.id
                  ? "Show Less"
                  : "Read More"}

              </button>


            </div>

          ))}

        </div>
        <div className="text-center mt-10">

          <a
            href="/current-affairs"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
          >

            View All Current Affairs

          </a>

        </div>
        </>
      )}

    </section>

  );

}