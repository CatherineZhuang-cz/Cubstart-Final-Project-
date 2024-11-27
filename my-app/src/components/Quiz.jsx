import React, { useEffect, useState } from "react";

/*const BASE_URL = "https://opentdb.com/api.php?amount=1";*/




const Quiz = ({ BASE_URL }) => {
  const [posts, setPosts] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersList, setAnswersList] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const fetchNextQuestion = async () => {
    setIsLoading(true); // Show loading status
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      const post = data.results[0];
      const allAnswers = [
        ...post.incorrect_answers.map((answer) => ({
          text: decodeHtml(answer),
          isCorrect: false,
        })),
        {
          text: decodeHtml(post.correct_answer),
          isCorrect: true,
        },
      ];

      // Shuffle answers
      for (let i = allAnswers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
      }

      const newPost = {
        question: decodeHtml(post.question),
        allAnswers,
      };

      setPosts([newPost]); // Add new question to posts
      setCurrentIndex(0);
      setIsLoading(false); // Remove loading status
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTotalQuestions(0); // Reset total questions 
    setCorrectAnswers(0); // Reset correct answers 
    setAnswersList([]); // Reset answers list 
    setIsQuizComplete(false);
    fetchNextQuestion(); // Fetch the first question on load
  }, [BASE_URL]);

  const handleAnswerClick = async (isCorrect, selectedAnswer) => {
    const currentQuestion = posts[currentIndex];
    setAnswersList((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.allAnswers.find((a) => a.isCorrect).text,
        isCorrect,
      },
    ]);

    setTotalQuestions((prev) => prev + 1);
    if (isCorrect) setCorrectAnswers((prev) => prev + 1);

    if (currentIndex + 1 < 10) {
      setCurrentIndex((prev) => prev + 1);
      await fetchNextQuestion(); // Ensure the fetch is awaited
    } else {
      setIsQuizComplete(true); // Quiz is complete after 10 questions
    }
  };

  return (
    <div className ='Quiz'>
      <div className="row align-items-center">
        <div className="col-lg-6 text-center">
          <div className = "Score">
            <img
                src="imgs\brain1.png"
                alt="Brain"
                className="img-fluid"
                style={{ maxWidth: "50%", opacity: "90%"}}
              />
            <p>Questions Answered: {totalQuestions}</p>
            <p>Correct Answers: {correctAnswers}</p>
            
          </div>
        </div>
        <div className="col-lg-6 text-center">
          {!isQuizComplete ? (
            isLoading || posts.length <= currentIndex ? (
              <div className = "Score">
                <p className="Game">Loading...</p>
              </div>
            ) : (
              <div className ="Game">
                <h1>Question {currentIndex + 1}:</h1>
                <p>{posts[currentIndex].question}</p>
                <ul>
                  {posts[currentIndex].allAnswers.map((answer, i) => (
                    <li
                      key={i}
                      onClick={() => handleAnswerClick(answer.isCorrect, answer.text)}
                    >
                      {String.fromCharCode(65 + i)}) {answer.text}
                    </li>
                  ))}
                </ul>
              </div>
            )
          ) : (
          <div className = "GameOverPage">
            <h1>Quiz Complete!</h1>
            <h2>Your Score: {correctAnswers} / 10</h2>
            <ul>
              {answersList.map((entry, index) => (
                <li key={index}>
                  <strong>Question {index + 1}:</strong> {entry.question}
                  <br />
                  <strong>Your Answer:</strong> {entry.selectedAnswer}
                  <br />
                  <strong>Correct Answer:</strong> {entry.correctAnswer}
                  <br />
                  <strong>Result:</strong> {entry.isCorrect ? "Correct" : "Incorrect"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Quiz;
