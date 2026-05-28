"use client";

import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase/config";

import {
  addDoc,
  collection,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import AutoCurrentAffairs from "@/components/AutoCurrentAffairs";

export default function AdminPage() {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const addCurrentAffair = async () => {

    if (!title || !category) return;

    await addDoc(collection(db, "currentAffairs"), {

  title,

  category,

  description,

  important,

  createdAt: new Date(),

  date: new Date().toLocaleDateString(),

});

    alert("Current Affair Added");

    setTitle("");
    setCategory("");
    setDescription("");
    setImportant(false);
  };
  const addQuizQuestion = async () => {

  if (
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !answer
  ) return;

  await addDoc(collection(db, "quizQuestions"), {

    question,

    options: [
      option1,
      option2,
      option3,
      option4,
    ],

    answer,

    createdAt: new Date(),

  });

  alert("Quiz Question Added");

  setQuestion("");
  setOption1("");
  setOption2("");
  setOption3("");
  setOption4("");
  setAnswer("");
};
const [authorized, setAuthorized] = useState(false);
const [loading, setLoading] = useState(true);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    (user) => {

      if (
        user?.email === "ananthugr2018@gmail.com"
      ) {
        setAuthorized(true);
      }

      setLoading(false);
    }
  );

  return () => unsubscribe();

}, []);

if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">
        Loading...
      </h1>
    </main>
  );
}

if (!authorized) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">
        Access Denied
      </h1>
    </main>
  );
}
  return (
    
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          <div className="mb-8">
           <AutoCurrentAffairs />
           </div>
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
           <textarea
            placeholder="Full Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border rounded-xl p-4 mb-4 text-black h-32"
          />
          <div className="flex items-center gap-3 mb-6">

          <input
            type="checkbox"
            checked={important}
            onChange={(e) =>
              setImportant(e.target.checked)
            }
          />

          <label className="text-black font-medium">
            Mark as Important for PSC
          </label>

        </div>
         <button
            onClick={addCurrentAffair}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Add Current Affair
          </button>

          </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">
              <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add Quiz Question
              </h2>

      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4 text-black"
      />

      <input
        type="text"
        placeholder="Option 1"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4 text-black"
      />

      <input
        type="text"
        placeholder="Option 2"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4 text-black"
      />

      <input
        type="text"
        placeholder="Option 3"
        value={option3}
        onChange={(e) => setOption3(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4 text-black"
      />

      <input
        type="text"
        placeholder="Option 4"
        value={option4}
        onChange={(e) => setOption4(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4 text-black"
      />

      <input
        type="text"
        placeholder="Correct Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full border rounded-xl p-4 mb-4 text-black"
      />

      <button
        onClick={addQuizQuestion}
        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
      >
        Add Quiz Question
      </button>

    </div>

        </div>

      </div>

    </main>

    
  );
}