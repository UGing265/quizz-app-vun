"use client";
import { useState } from "react";
import { questions } from "./data/questions";

export default function Page() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selected === "") return; // chưa chọn thì không next
    if (selected === questions[index].answer) setScore(score + 1);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected("");
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setFinished(false);
    setSelected("");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Next.js Quiz</h1>

        {finished ? (
          <>
            <p className="text-lg mb-4">
              🎉 You scored {score} / {questions.length}
            </p>
            <button
              onClick={restart}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Restart
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-medium mb-6">
              {questions[index].question}
            </h2>

            <form className="flex flex-col items-start gap-3 mb-6">
              {questions[index].options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-2 cursor-pointer w-full border rounded-lg p-2 ${
                    selected === opt
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    className="text-blue-500 accent-blue-500"
                  />
                  {opt}
                </label>
              ))}
            </form>

            <button
              onClick={handleNext}
              className={`w-full py-2 rounded-lg text-white ${
                selected
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!selected}
            >
              Next →
            </button>

            <p className="mt-6 text-sm text-gray-500">
              Question {index + 1} / {questions.length}
            </p>
          </>
        )}
      </div>
    </main>
  );
}
