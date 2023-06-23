import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIndex, setScore } from "../router/Action";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
const decodeHTML = function (html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
function Question() {
  // retrieve score, questions and index from the store
  const [options, setOptions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const totalScore = useSelector((state) => state.score);
  const questionIndex = useSelector((state) => state.index);
  const encodedQuestions = useSelector((state) => state.questions);
  const userName = useSelector((state) => state.name);
  // define dispatch
  const dispatch = useDispatch();
  // create variables for the question and correct answer
  console.log(totalScore);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });
    setQuestions(decodedQuestions);
  }, [encodedQuestions]);
  const question = questions[questionIndex];
  const answer = question && question.correct_answer;

  useEffect(() => {
    if (!question) {
      return;
    }
    let answers = [...question.incorrect_answers];
    answers.splice(
      getRandomInt(question.incorrect_answers.length),
      0,
      question.correct_answer
    );
    setOptions(answers);
  }, [question]);

  const handleListItemClick = (event) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);
    if (event.target.textContent === answer) {
      dispatch(setScore(totalScore));
    }
    if (questionIndex + 1 <= questions.length) {
      setTimeout(() => {
        setAnswerSelected(false);
        setSelectedAnswer(null);
        dispatch(setIndex(questionIndex));
      }, 2500);
    }
  };

  console.log(userName);

  return (
    <div>
      {question ? (
        <>
          <Grid>
            <Typography style={{ fontSize: 50 }}>
              WELCOME {userName ? userName : ""}
            </Typography>
            <Grid justifyContent="center" display="flex">
              <Card
                sx={{
                  minWidth: 180,
                  width: 500,
                  backgroundColor: "transparent",
                  mt: 10,
                }}
              >
                <CardContent>
                  <p>Question {questionIndex + 1}</p>
                  <h3>{question.question}</h3>

                  {options.map((option, i) => (
                    // <li key={i} onClick={handleListItemClick}>
                    //   {option}
                    // </li>
                    <Card
                      sx={{ backgroundColor: "transparent", mt: 2, height: 50 }}
                      onClick={handleListItemClick}
                    >
                      <CardContent>
                        <Typography>{option}</Typography>
                      </CardContent>
                    </Card>
                  ))}
                  <Typography sx={{ mt: 5 }}>
                    Score: {totalScore} / {questions.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
export default Question;
