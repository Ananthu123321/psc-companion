"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "quizQuestions"));
        const data: Question[] = [];
        querySnapshot.forEach((doc) => {
          const d = doc.data() as any;
          data.push({
            id: doc.id,
            question: d.question ?? "",
            options: d.options ?? [],
            answer: d.answer ?? "",
          });
        });
        setQuestions(data);
        setSelectedAnswers(Array(data.length).fill(""));
      } catch (err: any) {
        setError(err?.message ?? "Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => {
      const updated = [...prev];
      updated[questionIndex] = option;
      return updated;
    });
  };

  const submitQuiz = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      let total = 0;
      questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
          total++;
        }
      });

      setScore(total);

      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "quizResults"), {
          userId: user.uid,
          score: total,
          totalQuestions: questions.length,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err: any) {
      setError(err?.message ?? "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-10">Daily Quiz</h1>

        {loading && <p className="mb-6">Loading questions...</p>}
        {error && <p className="mb-6 text-red-600">{error}</p>}

        <div className="space-y-8">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white rounded-3xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800">
                {index + 1}. {question.question}
              </h2>

              <div className="mt-5 space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(index, option)}
                    className={`block w-full text-left px-5 py-3 rounded-xl border transition
                    ${
                      selectedAnswers[index] === option
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submitQuiz}
          disabled={submitting || loading}
          className="bg-green-600 text-white px-8 py-4 rounded-2xl mt-10 hover:bg-green-700 transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>

        {score !== null && (
          <div className="bg-white rounded-3xl shadow-xl p-8 mt-10 text-center">
            <h2 className="text-3xl font-bold text-blue-700">Your Score</h2>
            <p className="text-6xl font-bold mt-6 text-green-600">{score}/{questions.length}</p>
          </div>
        )}
      </div>
    </main>
  );
}