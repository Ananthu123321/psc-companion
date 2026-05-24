"use client";

import { useEffect, useState } from "react";

import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  auth,
  provider,
} from "@/firebase/config";

export default function LoginPage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <main className="min-h-screen bg-blue-50 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center">

        <h1 className="text-4xl font-bold text-blue-700">
          PSC Companion
        </h1>

        {!user ? (

          <>
            <p className="text-gray-600 mt-4">
              Login to continue your preparation journey
            </p>

            <button
              onClick={handleGoogleLogin}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 w-full hover:bg-blue-700 transition"
            >
              Continue with Google
            </button>
          </>

        ) : (

          <>
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mt-6"
            />

            <h2 className="text-2xl font-bold mt-4 text-gray-800">
              {user.displayName}
            </h2>

            <p className="text-gray-500 mt-2">
              {user.email}
            </p>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-3 rounded-xl mt-8 w-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>

        )}

      </div>

    </main>
  );
}