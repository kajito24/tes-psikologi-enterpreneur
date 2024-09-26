import Image from "next/image";
import ImageVeryLow from "@/public/sangat-rendah.png";
import ImageLow from "@/public/rendah.png";
import ImageMedium from "@/public/sedang.png";
import ImageHigh from "@/public/Tinggi.png";
import { getScoreCategory } from "@lib/utils";
import { Modal, Box, Typography, Button } from "@mui/material";

const resultImage = {
  veryLow: ImageVeryLow,
  low: ImageLow,
  medium: ImageMedium,
  high: ImageHigh,
};

export default function ResultModal({ open, score, onClose }) {
  const category = getScoreCategory(score);

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <Box className="bg-white rounded-xl p-6 flex flex-col gap-4 items-center lg:max-w-lg">
        <Image
          src={resultImage[category.name]}
          alt="Kategori skor"
          className="w-full"
        />
        <Typography components="h2" className="font-medium text-lg">
          {category.title}
        </Typography>
        <Typography className="text-center">
          Skor anda {score} – {category.description}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          className="w-full"
          onClick={onClose}
        >
          Tutup
        </Button>
      </Box>
    </Modal>
  );
}
