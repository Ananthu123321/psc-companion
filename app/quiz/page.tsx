"use client";

import { useState } from "react";

const questions = [
  {
    question: "What is the capital of Kerala?",
    options: [
      "Kochi",
      "Kozhikode",
      "Thiruvananthapuram",
      "Kannur",
    ],
    answer: "Thiruvananthapuram",
  },
  {
    question: "Who is known as the Father of the Indian Constitution?",
    options: [
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "B. R. Ambedkar",
      "Sardar Patel",
    ],
    answer: "B. R. Ambedkar",
  },
];

export default function QuizPage() {
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (selected: string, correct: string) => {
    if (selected === correct) {
      setScore((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700 mb-10">
          Daily Quiz
        </h1>

        <div className="space-y-6">

          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {index + 1}. {q.question}
              </h2>

              <div className="grid gap-3 mt-5">

                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option, q.answer)}
                    className="border rounded-xl px-4 py-3 text-left hover:bg-blue-100 transition"
                  >
                    {option}
                  </button>
                ))}

              </div>
            </div>
          ))}

        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-10 hover:bg-blue-700 transition"
        >
          Submit Quiz
        </button>

        {submitted && (
          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
            <h2 className="text-3xl font-bold text-green-600">
              Your Score: {score}/{questions.length}
            </h2>
          </div>
        )}

      </div>

    </main>
  );
}