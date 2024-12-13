import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";

function QuestionPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { questionId } = useParams();
  const questionNumber = parseInt(questionId, 10);
  const navigate = useNavigate();

  const userId = currentUser?._id;

  // Parse query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const level = queryParams.get("level");

  // Fetch quiz questions on component load
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch(`/api/quiz/questions?level=${level}`);
        const data = await response.json();
        setQuestions(data.questions); // Corrected this line
        // Initialize answers either from localStorage or an empty array
        const savedAnswers =
          JSON.parse(localStorage.getItem("userAnswers")) ||
          new Array(data.questions.length).fill(null);
        setUserAnswers(savedAnswers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        setLoading(false);
      }
    };

    fetchQuizQuestions();
  }, [level]);

  // Handle answer selection/input
  const handleAnswerChange = (index, value) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
    // Store the updated user answers in localStorage
    localStorage.setItem("userAnswers", JSON.stringify(newAnswers));
  };
  console.log("User Answers:", userAnswers);

  // Ensure questions is defined and has items before accessing its length
  const question =
    Array.isArray(questions) &&
    questionNumber > 0 &&
    questionNumber <= questions.length
      ? questions[questionNumber - 1]
      : null;

  // Initialize Timer
  useEffect(() => {
    let startTime = localStorage.getItem("quizStartTime");

    // Add more robust parsing and checking
    startTime = startTime ? parseInt(startTime, 10) : null;

    // Initialize the timer if necessary
    if (!startTime && questionNumber === 1) {
      startTime = Date.now();
      localStorage.setItem("quizStartTime", startTime.toString());
      setTimerActive(true);
    } else if (startTime) {
      setTimerActive(true);
    }

    // Rest of the timer logic remains the same
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        const storedStart = localStorage.getItem("quizStartTime");
        const parsedStartTime = storedStart ? parseInt(storedStart, 10) : null;

        if (parsedStartTime) {
          const elapsed = Math.floor((Date.now() - parsedStartTime) / 1000);
          setElapsedTime(elapsed);
        }
      }, 1000);
    }

    // Cleanup the timer
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerActive, questionNumber]);

  const handleFinish = async () => {
    setTimerActive(false);
    localStorage.removeItem("quizStartTime");

    // Validate userAnswers
    const validatedAnswers = userAnswers.map(
      (ans) => ans || (Array.isArray(ans) ? [] : null)
    );

    const data = {
      level, // Quiz level (e.g., "101")
      userAnswers: validatedAnswers, // Validated answers array
      elapsedTime, // Time taken in seconds
      userId, // User ID
    };

    console.log("Submitting Data:", data);

    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/quiz-leaderboard");
      } else {
        console.error("Error submitting quiz:", result.message);
      }
    } catch (error) {
      console.error("Error in submitting quiz:", error);
    }
  };

  if (loading) {
    return <div className="mt-10 text-center">Loading question...</div>;
  }

  if (!question) {
    return <div className="mt-10 text-center">Question not found.</div>;
  }

  const isFirst = questionNumber === 1;
  const isLast = questionNumber === questions.length;

  const goToNextQuestion = () => {
    if (!isLast) {
      navigate(`/quiz/${questionNumber + 1}?level=${level}`);
    }
  };

  const goToPreviousQuestion = () => {
    if (!isFirst) {
      navigate(`/quiz/${questionNumber - 1}?level=${level}`);
    }
  };

  return (
    <div className="min-h-screen p-10 text-gray-800 bg-white md:p-20 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center ">
          Alumni Quiz Challenge
        </h1>

        <div className="flex justify-center mx-auto ">
          <div className="p-5 space-y-8 overflow-hidden border-b-4 shadow-xl md:w-3/4 md:p-10 rounded-3xl border-refaa-red">
            {/* Timer */}
            <div className="flex justify-between w-full mt-4">
              <span className="text-sm font-semibold text-left md:text-lg">
                Question: {question.questionId}
              </span>
              <span className="p-2 text-sm font-semibold text-right border-2 rounded-lg border-refaa-red md:text-lg">
                Time Elapsed: {elapsedTime} seconds
              </span>
            </div>

            <div className="p-6 text-center">
              <h2 className="font-semibold text-justify md:text-xl">{question.text}</h2>
              <div className="flex justify-center mx-auto mt-4 space-y-4">
                {question.type === "radio" && (
                  <div className="flex flex-col space-y-2">
                    {question.options.map((answer, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`question-${questionNumber}`}
                          value={answer}
                          checked={userAnswers[questionNumber - 1] === answer}
                          onChange={(e) =>
                            handleAnswerChange(
                              questionNumber - 1,
                              e.target.value
                            )
                          }
                        />
                        <span>{answer}</span>
                      </label>
                    ))}
                  </div>
                )}
                {question.type === "checkbox" && (
                  <div className="flex flex-col space-y-2">
                    {question.options.map((answer, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name={`question-${questionNumber}`}
                          value={answer}
                          checked={userAnswers[questionNumber - 1]?.includes(
                            answer
                          )}
                          onChange={(e) => {
                            const selectedAnswers = [
                              ...(userAnswers[questionNumber - 1] || []),
                            ];
                            if (e.target.checked) {
                              // Add the answer if checked
                              selectedAnswers.push(answer);
                            } else {
                              // Remove the answer if unchecked
                              const indexToRemove =
                                selectedAnswers.indexOf(answer);
                              if (indexToRemove > -1) {
                                selectedAnswers.splice(indexToRemove, 1);
                              }
                            }
                            handleAnswerChange(
                              questionNumber - 1,
                              selectedAnswers
                            );
                          }}
                        />
                        <span>{answer}</span>
                      </label>
                    ))}
                  </div>
                )}
                {question.type === "textinput" && (
                  <input
                    type="text"
                    name={`question-${questionNumber}`}
                    placeholder="Type your answer here..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={userAnswers[questionNumber - 1] || ""}
                    onChange={(e) =>
                      handleAnswerChange(questionNumber - 1, e.target.value)
                    }
                  />
                )}
              </div>{" "}
            </div>
            <div className="flex justify-center gap-4 mx-auto">
              {/* Previous Button */}
              {!isFirst ? (
                <Button
                  className="mx-auto mt-10 bg-gray-500 hover:bg-gray-600"
                  onClick={goToPreviousQuestion}
                >
                  Previous
                </Button>
              ) : (
                ""
              )}
              {/* Next Button */}
              {!isLast ? (
                <Button
                  className="mx-auto mt-10 bg-refaa-red hover:bg-refaa-red-dark hover:shadow-2xl hover:px-2"
                  onClick={goToNextQuestion}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className="mx-auto mt-10 bg-refaa-red hover:bg-refaa-red-dark"
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  Finish Attempt
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to finish the quiz?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleFinish}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuestionPage;
