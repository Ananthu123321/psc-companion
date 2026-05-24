"use client";

import { useState } from "react";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export default function AdminPage() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const addCurrentAffair = async () => {

    if (!title || !category) return;

    await addDoc(collection(db, "currentAffairs"), {
      title,
      category,
      date: new Date().toDateString(),
    });

    alert("Current Affair Added");

    setTitle("");
    setCategory("");
  };

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          Admin Panel
        </h1>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Add Daily Current Affair
          </h2>

          <input
            type="text"
            placeholder="Current affair title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-xl p-4 mb-4 text-black"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-4 mb-4 text-black"
          />

          <button
            onClick={addCurrentAffair}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Add Current Affair
          </button>

        </div>

      </div>

    </main>
  );
}