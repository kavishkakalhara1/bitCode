import { Button } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function QuizStartPage() {
  const navigate = useNavigate();
  const handleAttemptQuiz = () => {
    // Clear any existing timer data
    localStorage.removeItem("quizStartTime");
    localStorage.removeItem("userAnswers");
    navigate("/quiz/1?level=101");
  };
  return (
    <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center ">
          Welcome to Alumni Quiz Challenge
        </h1>

        <div className="flex justify-center mx-auto ">
          <div className="w-3/4 p-5 space-y-8 overflow-hidden border-b-4 shadow-xl md:p-10 rounded-3xl border-refaa-red">
            <div className="p-6 font-sans text-center">
              <p className="mb-6 text-lg">
                Test your knowledge of the Faculty of Engineering, University of
                Ruhuna, and explore fascinating trivia about our university's
                history and milestones.
              </p>
              <h2 className="mb-3 text-xl font-semibold">💡 How It Works:</h2>
              <ul className="mb-6 space-y-2 list-none">
                <li>You’ll answer a series of multiple-choice questions.</li>
                <li>Each correct answer earns you points.</li>
                <li>
                  Your completion time will be recorded, so aim to be quick and
                  accurate!
                </li>
              </ul>
              <h2 className="mb-3 text-xl font-semibold">
                📊 Compete for Glory:
              </h2>
              <p className="mb-6 text-lg">
                Your score will be saved and added to the leaderboard. Can you
                climb to the top and prove your expertise?
              </p>
              <h2 className="mb-3 text-xl font-semibold">🎮 Ready to begin?</h2>
              <p className="mb-6 text-lg">
                Click <span className="font-bold">Attempt Quiz</span> to embark
                on this fun and engaging challenge!
              </p>
              <p className="text-lg font-bold">
                Good luck, and may the best alum win! 🚀
              </p>
            </div>

            <Button className="mx-auto mt-10 bg-refaa-red" onClick={handleAttemptQuiz}>Attempt Quiz</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizStartPage;
