import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

export default function SurveyAnswers({ options, onChange, selectedAnswer }) {
  return (
    <FormControl>
      <FormLabel className="mb-2">Jawaban Anda</FormLabel>
      <RadioGroup
        aria-labelledby="answer-options"
        name="answer-options"
        className="gap-4"
      >
        {options.map((opt, k) => (
          <FormControlLabel
            key={k}
            value={k + 1}
            control={<Radio />}
            label={opt}
            checked={selectedAnswer == k + 1}
            onChange={onChange}
            className="bg-white rounded-md w-full mx-auto h-14"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
