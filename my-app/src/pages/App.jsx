import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Navbar from "../components/Navbar";
import Homepage from "../components/homepage";
import Quiz from "../components/Quiz";

const App = () => {
  return (
    <Router>
      <Navbar />
      <section className="main py-5">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/quiz" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=1"/>} />
          <Route path="/books" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=10&category=10"/>} />
          <Route path="/film" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=10&category=11"/>} />
          <Route path="/history" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=10&category=23"/>} />
          <Route path="/anime" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=10&category=31"/>} />
          <Route path="/theatres" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=10&category=13"/>} />
          <Route path="/music" element={<Quiz BASE_URL ="https://opentdb.com/api.php?amount=10&category=12"/>} />

        </Routes>
      </section>
    </Router>
  );
};

export default App;
