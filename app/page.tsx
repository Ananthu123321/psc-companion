"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "@/firebase/config";

import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import CurrentAffairs from "@/components/CurrentAffairs";
import StreakCard from "@/components/StreakCard";
import ReminderCard from "@/components/ReminderCard";
import QuizAnalytics from "@/components/QuizAnalytics";

export default function Home() {

  const [user, setUser] = useState<any>(null);

 const [loading, setLoading] =
  useState(true);

  const router = useRouter();
    useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      (currentUser) => {

        if (currentUser) {

          setUser(currentUser);

        } else {

          setTimeout(() => {

            router.push("/login");

          }, 0);

        }

        setLoading(false);

      }
    );

  return () => unsubscribe();

}, [router]);

  const handleLogout = async () => {

    await signOut(auth);

    router.push("/login");

  };
 if (loading) {

  return (

    <main className="min-h-screen flex items-center justify-center">

      <h1 className="text-3xl font-bold text-blue-600">
        Loading...
      </h1>

    </main>

  );

}
  return (

    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">

      <section className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-3xl font-bold text-blue-700">
              PSC Companion
            </h1>

            <p className="text-gray-600 mt-1">
              Welcome {user?.email}
            </p>

          </div>

          <div className="flex gap-3">

            {user?.email === "ananthugr2018@gmail.com" && (

              <button
                onClick={() => router.push("/admin")}
                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
              >
                Admin
              </button>

            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

        <Navbar />

        <div className="text-center mt-10">

          <h1 className="text-5xl font-bold text-blue-700">
            PSC Companion
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Your personalized Kerala PSC preparation partner
          </p>

        </div>

        <StatsCards />

        <CurrentAffairs />

        <StreakCard />

        <ReminderCard />

        <QuizAnalytics />

        <div className="grid md:grid-cols-3 gap-6 mt-14">

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold text-blue-600">
              Daily Current Affairs
            </h2>

            <p className="text-gray-600 mt-3">
              Stay updated with important Kerala PSC current affairs every day.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold text-green-600">
              Daily Quizzes
            </h2>

            <p className="text-gray-600 mt-3">
              Practice quizzes daily and improve accuracy with progress tracking.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold text-purple-600">
              Notes & Revision
            </h2>

            <p className="text-gray-600 mt-3">
              Add notes, revise important topics, and organize study materials.
            </p>

          </div>

        </div>

        <div className="bg-blue-600 rounded-3xl text-white p-10 mt-16 text-center">

          <h2 className="text-3xl font-bold">
            Stay Consistent Every Day
          </h2>

          <p className="mt-4 text-lg">
            Small daily improvements lead to PSC success.
          </p>

          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl mt-6 font-semibold hover:bg-gray-100 transition">
            Start Learning
          </button>

        </div>

      </section>

    </main>

  );
}