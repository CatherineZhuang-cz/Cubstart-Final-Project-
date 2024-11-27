import React from "react";
import {useEffect, useState} from 'react'; 
import Navbar from "../my-app/src/components/Navbar";


const BASE_URL = "https://opentdb.com/api.php?amount=10";

const Quiz = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      try{
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setPosts(data.results);
      } catch(error) {console.error("Error fetching data:", error)

      }
    };

    fetchPosts();
  }, []);


  return (
    <div>
      <Navbar />
      <ul>
      {posts && posts.length > 0 ? ( 
        posts.map((post, index) => ( 
        <li key={index}>{decodeURIComponent([post.question, post.correct_answer,post.incorrect_answers])}</li> 
      )) 
    ) : ( 
    <li>Loading...</li>
    )}
      </ul>
    </div>
  );

};


export default Quiz;

import React from "react";
import {useEffect, useState} from 'react'; 


const BASE_URL = "https://opentdb.com/api.php?amount=1";

const Quiz = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
  
        const questions = data.results.map((post) => {
          const allAnswers = [
            ...post.incorrect_answers.map((answer) => ({
              text: decodeURIComponent(answer),
              isCorrect: false,
            })),
            {
              text: decodeURIComponent(post.correct_answer),
              isCorrect: true,
            },
          ];
  
          // Shuffle answers
          for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
          }
  
          return {
            ...post,
            allAnswers,
            question: decodeURIComponent(post.question),
          };
        });
  
        setPosts(questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchPosts();
  }, []);  


  return (
    <div className="row align-items-center">
      <div className="col-lg-6 text-center">
        <img
          src="imgs\brain1.png"
          alt="Brain"
          className="img-fluid"
          style={{ maxWidth: "105%" }}/>
      </div>
      <div className="col-lg-6 ">
        <h1>Question:</h1>
        <ul>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <li key={index}>
                <h2> {decodeURIComponent(post.question)}</h2>
                <ul>
                   {post.allAnswers.map((answer, i) => (
                      <li key={i}>
                        {String.fromCharCode(65 + i)}) {answer.text}
                      </li>
                    ))}
                </ul>

              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
      </div>
  );

  

};


export default Quiz;

/*=================================================*/


import React, { useEffect, useState } from "react";

const BASE_URL = "https://opentdb.com/api.php?amount=1";

const Quiz = () => {
  const [posts, setPosts] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersList, setAnswersList] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        const questions = data.results.map((post) => {
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

          return {
            ...post,
            allAnswers,
            question: decodeHtml(post.question),
          };
        });

        setPosts(questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleAnswerClick = (isCorrect, selectedAnswer) => {
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
    } else {
      setIsQuizComplete(true);
    }
  };
  

  return (
    <div className="row align-items-center">
      <div className="col-lg-6 text-center">
        <div>
          <p>Questions Answered: {totalQuestions}</p>
          <p>Correct Answers: {correctAnswers}</p>
        </div>
      </div>
      <div className="col-lg-6">
        <h1>Question:</h1>
        <div>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index}>
                <h2>{post.question}</h2>
                <ul>
                  {post.allAnswers.map((answer, i) => (
                    <li
                      key={i}
                      onClick={() => handleAnswerClick(answer.isCorrect)}
                    >
                      {String.fromCharCode(65 + i)}) {answer.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
