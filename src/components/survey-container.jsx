"use client";

import { useState } from "react";
import { signOut } from "@/app/actions";
import { questions } from "@/questions";
import ResultModal from "./survey/result-modal";
import SurveyButtons from "./survey/survey-buttons";
import SurveyAnswers from "./survey/survey-answers";
import SurveyQuestion from "./survey/survey-question";
import { Box, LinearProgress, Typography } from "@mui/material";

const options = [
  "Sangat tidak setuju",
  "Tidak setuju",
  "Netral",
  "Setuju",
  "Sangat setuju",
];

function LinearProgressWithLabel({ currentQuestion, totalQuestions }) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${currentQuestion}/${totalQuestions}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function SurveyContainer() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [status, setStatus] = useState(false);
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleNext = () => {
    const newQuestionNumber = Math.min(questions.length, questionNumber + 1); // use Math.min() to prevent going over the questions length

    setSelectedAnswer(null);
    setQuestionNumber(newQuestionNumber);
    setScore((prevScore) => prevScore + parseInt(selectedAnswer));
  };

  const handleFinish = () => {
    setStatus("submitting");

    if (status === "submitted") {
      setStatus("submitted");
      setIsOpen(true);
      return;
    }

    setScore((prevScore) => prevScore + parseInt(selectedAnswer));

    fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        score: score,
      }),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          setStatus("error");
        }

        setStatus("submitted");
        setIsOpen(true);
      })
      .catch(() => {
        setStatus(null);
        setIsOpen(true);
      });
  };

  const handleCloseModal = async () => {
    setIsOpen(false);
    setScore(0);
    setQuestionNumber(1);
    setSelectedAnswer(null);
    await signOut();
  };

  return (
    <div className={`p-8 flex w-full max-w-xl h-full flex-col justify-between`}>
      {/* Progress */}
      <Box className="w-full">
        <LinearProgressWithLabel
          currentQuestion={questionNumber}
          totalQuestions={questions.length}
        />
      </Box>

      {/* Question */}
      <SurveyQuestion questions={questions} currentQuestion={questionNumber} />

      <div className="flex flex-col gap-6">
        <SurveyAnswers
          options={options}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          selectedAnswer={selectedAnswer}
        />

        <SurveyButtons
          onNext={handleNext}
          onFinish={handleFinish}
          hideNext={questionNumber >= questions.length}
          disableNext={!selectedAnswer}
          hideFinish={questionNumber < questions.length}
          disableFinish={!selectedAnswer || isOpen}
          loading={status === "submitting"}
        />

        <ResultModal score={score} open={isOpen} onClose={handleCloseModal} />
      </div>
    </div>
  );
}
