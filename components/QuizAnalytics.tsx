"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", score: 5 },
  { day: "Tue", score: 7 },
  { day: "Wed", score: 6 },
  { day: "Thu", score: 8 },
  { day: "Fri", score: 9 },
  { day: "Sat", score: 7 },
  { day: "Sun", score: 10 },
];

export default function QuizAnalytics() {

  const average =
    data.reduce((acc, item) => acc + item.score, 0) /
    data.length;

  const bestScore = Math.max(
    ...data.map((item) => item.score)
  );

  return (
    <section className="mt-16">

      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📊 Quiz Analytics
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500">
            Quizzes Attempted
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {data.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500">
            Average Score
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {average.toFixed(1)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-gray-500">
            Best Score
          </h3>

          <p className="text-4xl font-bold text-orange-500 mt-3">
            {bestScore}/10
          </p>
        </div>

      </div>

      <div className="bg-white rounded-3xl shadow-md p-8 mt-10">

        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Weekly Progress
        </h3>

        <div className="w-full h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </section>
  );
}