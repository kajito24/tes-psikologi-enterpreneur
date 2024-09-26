import { Typography, Container, Grid2 as Grid } from "@mui/material";
import Image from "next/image";
import ImageLogoKreki from "@/public/logoKreki.png";
import ImageLogoIndoHCF from "@/public/LogoIndoHCF.png";
import BiodataForm from "@/components/BiodataForm";

export default function LoginContainer() {
  return (
    <Container className="flex items-center min-h-screen max-w-scren-md">
      <Grid container columns={16} className=" text-gray-800">
        {/* Left container */}
        <Grid container size={8} className="bg-white gap-8 p-8">
          {/* Image Container */}
          <Grid container columns={8}>
            <Grid item size={4}>
              <Image src={ImageLogoKreki} alt="logo Kreki" draggable={false} />
            </Grid>
            <Grid item size={4}>
              <Image
                src={ImageLogoIndoHCF}
                alt="logo IndoHCF"
                draggable={false}
              />
            </Grid>
          </Grid>
          {/* Description */}
          <Grid container spacing={2} textAlign="center">
            <Grid item size={16}>
              <Typography level="h1" className="font-bold text-xl">
                Tes Psikologi Entrepeneur
              </Typography>
            </Grid>
            <Grid item size={16}>
              <Typography>
                KREKI (Komunitas Relawan Emergensi Kesehatan Indonesia) bersama
                Indo HCF (Indonesia Healthcare Forum), mengajak Bpk /Ibu / Sdr /
                Sdri melakukan self assessment, apakah kita mempunyai jiwa
                entrepreneur sekaligus memotivasi agar jiwa <em>entrepeneur</em>{" "}
                kita meningkat dengan berusaha meraih score tinggi .
              </Typography>
            </Grid>
            <Grid item size={16}>
              <Typography>
                Jawab setiap pertanyaan dengan jujur dan hasilnya akan membantu
                anda memahami diri anda lebih baik.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Right Container */}
        <Grid
          container
          size={8}
          p={6}
          className="bg-gray-100 flex items-center"
        >
          <Grid container spacing={6}>
            <Grid container spacing={2}>
              <Typography level="h1" className="font-bold text-xl">
                Data Diri
              </Typography>
              <Typography>
                Silakan isi data diri anda dengan lengkap sebelum memulai
                survey.
              </Typography>
            </Grid>
            <Grid item size={16}>
              <BiodataForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
