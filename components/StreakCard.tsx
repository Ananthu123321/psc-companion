"use client";

import { useEffect, useState } from "react";

export default function StreakCard() {

  const [streak, setStreak] = useState(0);

  useEffect(() => {

    const today = new Date().toDateString();

    const lastVisit = localStorage.getItem("lastVisit");

    let currentStreak = Number(
      localStorage.getItem("studyStreak") || 0
    );

    if (lastVisit !== today) {

      currentStreak += 1;

      localStorage.setItem(
        "studyStreak",
        currentStreak.toString()
      );

      localStorage.setItem(
        "lastVisit",
        today
      );
    }

    setStreak(currentStreak);

  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl shadow-xl p-8 text-white mt-10">

      <h2 className="text-3xl font-bold">
        🔥 Study Streak
      </h2>

      <p className="text-5xl font-bold mt-4">
        {streak} Days
      </p>

      <p className="mt-4 text-lg opacity-90">
        Keep learning daily and maintain consistency.
      </p>

    </div>
  );
}