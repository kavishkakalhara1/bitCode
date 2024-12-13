import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Search from "../pages/Search";
import Projects from "../pages/ArticlesPage";
import { AnimatePresence } from "framer-motion";
import NotFound from "../pages/NotFound";
import QuizStartPage from "../pages/Quiz/QuizStartPage";
import QuestionPage from "../pages/Quiz/QuestionPage";
import Leaderboard from "../pages/Quiz/Leaderboard";
import QuizResultsPage from "../pages/Quiz/QuizResultsPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/articles" element={<Projects />} />
        <Route path="/quiz" element={<QuizStartPage />} />
        <Route path="/quiz/:questionId" element={<QuestionPage />} />
        <Route path="/quiz-leaderboard/" element={<Leaderboard/>} />
        <Route path="/quiz-results" element={<QuizResultsPage/>} />

        
        
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
