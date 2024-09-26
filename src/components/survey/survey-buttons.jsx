import { Button, CircularProgress } from "@mui/material";

export default function SurveyButtons({
  onNext,
  onFinish,
  hideNext,
  disableNext,
  hideFinish,
  disableFinish,
  loading,
}) {
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={onNext}
        hidden={hideNext}
        disabled={disableNext}
        className="w-full"
      >
        Lanjut
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={onFinish}
        hidden={hideFinish}
        disabled={disableFinish || loading}
        className="w-full"
      >
        {loading ? <CircularProgress size={30} /> : "Lihat Hasil"}
      </Button>
    </div>
  );
}
