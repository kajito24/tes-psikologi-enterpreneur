"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageRendah from "@/public/rendah.png";
import ImageSangatRendah from "@/public/sangat-rendah.png";
import ImageSedang from "@/public/sedang.png";
import ImageTinggi from "@/public/Tinggi.png";

export default function TestPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState(null);
  const [birthYear, setBirthYear] = useState(null);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [totalScores, setTotalScores] = useState(0);

  const handleCloseResult = (e) => {
    setIsResultOpen(false);
    sessionStorage.clear();
    router.replace("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    let totalScores = 0;
    formData.forEach((v, k) => {
      if (!isNaN(v) && v.trim() !== "") {
        totalScores += parseFloat(v);
      }
    });

    const requestBody = {
      fullName: fullName,
      birthYear: birthYear,
      score: totalScores,
    };

    fetch("/api/scores", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (totalScores >= 80) {
          setResultImage(ImageTinggi);
          setResultMessage(
            "Tinggi – Anda memiliki jiwa entrepreneur yang sangat kuat. Anda cenderung berani mengambil risiko, inovatif, dan tahan banting, kualitas yang penting untuk menjadi entrepreneur sukses."
          );
        } else if (totalScores >= 60) {
          setResultImage(ImageSedang);
          setResultMessage(
            "Sedang – Anda memiliki potensi besar sebagai entrepreneur. Dengan pengembangan lebih lanjut dalam area tertentu, Anda bisa menjadi lebih sukses di dunia kewirausahaan."
          );
        } else if (totalScores >= 40) {
          setResultImage(ImageRendah);
          setResultMessage(
            "Rendah – Anda mungkin memiliki beberapa kualitas entrepreneur, tetapi perlu lebih banyak pengembangan dalam hal pengambilan risiko, kreativitas, atau ketekunan."
          );
        } else {
          setResultImage(ImageSangatRendah);
          setResultMessage(
            "Sangat Rendah – Mungkin jiwa entrepreneur Anda belum berkembang. Jika tertarik, Anda bisa mulai mengasah keterampilan-keterampilan yang mendukung kewirausahaan."
          );
        }

        setTotalScores(totalScores);
        setIsResultOpen(true);
      })
      .catch((err) => console.error("Error submitting data", err));
  };

  useEffect(() => {
    const storedFullName = sessionStorage.getItem("fullName");
    const storedBirthYear = sessionStorage.getItem("DOB");

    if (!storedFullName || !storedBirthYear) return router.replace("/");

    setFullName(storedFullName);
    setBirthYear(storedBirthYear);
  }, []);

  // TODO fix modal not showing after calculating score
  return (
    <div>
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold mt-10 text-gray-50">
          TEST JIWA ENTERPRENEUR
        </h1>
        <h1 className="mt-10 text-base text-gray-50">
          Jawab dengan jujur sesuai motivasi anda!
        </h1>
        <form
          className="space-y-4 font-sans md:text-xl text-xs"
          onSubmit={handleSubmit}
        >
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya sering mencari peluang baru bahkan ketika saya sudah berada
              di posisi yang nyaman.
            </label>
            <select
              name="question2"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full"
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya lebih suka mengambil risiko yang telah diperhitungkan
              daripada mengikuti jalan yang aman.
            </label>
            <select
              name="question3"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya berani memulai sesuatu yang baru meskipun ada kemungkinan
              gagal.
            </label>
            <select
              name="question4"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya sering menemukan cara baru untuk menyelesaikan masalah.
            </label>
            <select
              name="question5"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya menikmati berpikir di luar kebiasaan dan mencoba hal-hal
              baru.
            </label>
            <select
              name="question6"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya melihat peluang di mana orang lain melihat masalah.
            </label>
            <select
              name="question7"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya tetap berusaha meskipun menghadapi kegagalan atau rintangan
              besar.
            </label>
            <select
              name="question8"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya tidak mudah menyerah saat proyek atau usaha mengalami
              kesulitan.
            </label>
            <select
              name="question9"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full  "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya termotivasi oleh tantangan dan bersemangat untuk terus
              berkembang.
            </label>
            <select
              name="question10"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya mudah beradaptasi ketika situasi atau rencana berubah.
            </label>
            <select
              name="question11"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya tidak takut untuk mengubah strategi jika yang sekarang tidak
              berhasil.
            </label>
            <select
              name="question12"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya nyaman dengan ketidakpastian dan dapat bekerja di lingkungan
              yang tidak stabil.
            </label>
            <select
              name="question13"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya percaya diri dalam mengambil keputusan penting.
            </label>
            <select
              name="question14"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya mampu mengelola sumber daya (waktu, uang, tenaga) dengan
              efektif.
            </label>
            <select
              name="question15"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya menikmati bekerja dalam tim dan mampu memotivasi orang lain
              untuk mencapai tujuan bersama.
            </label>
            <select
              name="question16"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya secara aktif membangun hubungan dengan orang-orang yang dapat
              membantu perkembangan bisnis atau ide saya.
            </label>
            <select
              name="question17"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya senang bekerja sama dengan orang lain untuk mencapai tujuan
              bersama.
            </label>
            <select
              name="question17"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya terbuka untuk belajar dari orang lain dan mengambil manfaat
              dari pengalaman mereka.
            </label>
            <select
              name="question18"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya memiliki visi yang jelas tentang tujuan yang ingin saya capai
              di masa depan.
            </label>
            <select
              name="question19"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya secara aktif merencanakan langkah-langkah untuk mencapai visi
              tersebut.
            </label>
            <select
              name="question20"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center m-2">
            <label className="text-gray-700 flex text-left">
              Saya berpikir tentang bagaimana menciptakan dampak jangka panjang
              melalui usaha saya.
            </label>
            <select
              name="question21"
              className="group bg-gray-300 text-gray-700 py-2 px-4 rounded-full "
            >
              <option value="1">Sangat tidak setuju</option>
              <option value="2">Tidak setuju</option>
              <option value="3">Netral</option>
              <option value="4">Setuju</option>
              <option value="5">Sangat setuju</option>
            </select>
          </div>
          <button
            type="submit"
            className="flex justify-center gap-2 items-center mx-auto shadow-xl 
              text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto 
              border-gray-50 before:absolute before:w-full before:transition-all 
              before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 
              before:rounded-full before:bg-gray-900 hover:text-gray-50 before:-z-10 
              before:aspect-square before:hover:scale-150 before:hover:duration-700 
              relative z-10 px-8 py-4 overflow-hidden border-2 rounded-full group"
          >
            Lihat Hasil
            <svg
              className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
              viewBox="0 0 16 19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                className="fill-gray-800 group-hover:fill-gray-800"
              ></path>
            </svg>
          </button>
        </form>
      </div>
      <a href="index.html">
        <button
          className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-gray-300"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M11 6L5 12M5 12L11 18M5 12H19"
            ></path>
          </svg>
        </button>
      </a>
      <div
        className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bottom-auto bg-gray-800 bg-opacity-0 z-50 ${
          !isResultOpen ? "hidden" : "flex"
        } justify-center`}
      >
        <div className="bg-gray-100 backdrop-blur-sm p-6 rounded-[30px] shadow-lg max-w-md lg:max-w-xl w-full">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
            Hasil Tes Jiwa Entrepreneur
          </h2>
          <div className="mb-4">
            <Image
              src={resultImage ?? ImageSangatRendah}
              alt="Hasil Tes"
              className="max-w-xs mx-auto"
            />
          </div>
          <div className="text-left mb-4 text-base lg:text-lg">
            <strong>Skort Anda: {totalScores}</strong>
            <br />
            {resultMessage}
          </div>
          <button
            onClick={handleCloseResult}
            className="bg-gray-900 text-white px-4 py-2 rounded lg:px-6 lg:py-3"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
