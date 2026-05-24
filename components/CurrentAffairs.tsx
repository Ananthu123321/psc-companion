"use client";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export default function CurrentAffairs() {

  const [affairs, setAffairs] = useState<any[]>([]);

  const fetchAffairs = async () => {

    const querySnapshot = await getDocs(
      collection(db, "currentAffairs")
    );

    const data: any[] = [];

    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setAffairs(data);
  };

  useEffect(() => {
    fetchAffairs();
  }, []);

  return (
    <section className="mt-16">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold text-gray-800">
          Daily Current Affairs
        </h2>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {affairs.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >

            <span className="text-sm text-blue-600 font-semibold">
              {item.category}
            </span>

            <h3 className="text-xl font-bold mt-3 text-gray-800">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-4 text-sm">
              {item.date}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}