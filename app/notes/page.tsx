"use client";

import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  auth,
  db,
} from "@/firebase/config";

import { onAuthStateChanged } from "firebase/auth";

export default function NotesPage() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

 useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

    if (currentUser) {
      setUser(currentUser);
      fetchNotes(currentUser.uid);
    }

  });

  return () => unsubscribe();

}, []);

  const fetchNotes = async (userId: string) => {
    const q = query(collection(db, "notes"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const notesData: any[] = [];

    querySnapshot.forEach((doc) => {
      notesData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setNotes(notesData);
  };

  useEffect(() => {
    if (user) {
      fetchNotes(user.uid);
    }
  }, [user]);

  const addNote = async () => {
    if (note.trim() === "") return;

    await addDoc(collection(db, "notes"), {
      content: note,
      createdAt: new Date(),
    });

    setNote("");

    if (user) {
      fetchNotes(user.uid);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Notes
        </h1>

        <div className="bg-white rounded-2xl shadow-md p-6">

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your notes here..."
           className="w-full border rounded-xl p-4 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-400 text-black bg-white"
          />

          <button
            onClick={addNote}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4 hover:bg-blue-700 transition"
          >
            Add Note
          </button>

        </div>

        <div className="space-y-4 mt-8">

          {notes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-5"
            >
              <p className="text-gray-700">
                {item.content}
              </p>
            </div>
          ))}

        </div>

      </div>

    </main>
  );
}