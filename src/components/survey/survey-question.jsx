export default function SurveyQuestion({ questions, currentQuestion }) {
  return (
    <div className="text-lg font-medium max-w-full">
      {questions[currentQuestion - 1]}
    </div>
  );
}
