"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageLogoKreki from "@/public/logoKreki.png";
import ImageLogoIndoHCF from "@/public/logoIndoHCF.png";

export default function Home() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState(1945);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    formData.forEach((v, k) => {
      sessionStorage.setItem(k, v);
    });

    router.push("/tes");
  };

  useEffect(() => {
    const storedFullName = sessionStorage.getItem("fullName");
    const storedBirthYear = sessionStorage.getItem("DOB");

    setFullName(storedFullName);
    setBirthYear(storedBirthYear);

    if (storedFullName && storedBirthYear) return router.push("/tes");
  }, []);

  return (
    <div className="max-w-lg text-center mt-10 border-8 m-8 bg-gray-200 p-5 rounded-[40px] shadow-lg">
      <h1 className="flex justify-center scale-100 border-spacing-5 mx-auto w-32 h-20"><Image src={ImageLogoKreki} alt="logo Kreki"/><Image src={ImageLogoIndoHCF} alt="logo IndoHCF"/> </h1>
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 mt-10">
        SELAMAT DATANG!
      </h1>
      
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 ">
        DI TEST PSIKOLOGI ENTERPRENEUR
      </h1>
      <p className="text-lg lg:text-ms mb-6 text-gray-900 mt-10">
        KREKI ( KOMUNITAS RELAWAN EMERGENSI KESEHATAN INDONESIA ) bersama
        INDOHCF ( INDONESIA HEALTHCARE FORUM ) , mengajak Bpk /Ibu / Sdr / Sdri
        melakukan self assesment , apakah kita mempunyai jiwa entrepreneur
        Sekaligus memotivasi agar jiwa *entrepreneur*kita meningkat dg berusaha
        meraih score tinggi .
      </p>
      <p className="text-lg lg:text-ms mb-6 text-gray-900 mt-1">
        Jawab setiap pertanyaan dengan jujur dan hasilnya akan membantu Anda
        memahami diri Anda lebih baik.
      </p>

      {/* Form Biodata */}
      <div className="text-left">
        <p className="mb-4 text-center">
          Silakan isi data diri Anda sebelum mengisi survey
        </p>
        <form
          action=""
          className="w-full flex flex-col gap-4"
          id="biodataForm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="inputFullName">Nama Lengkap</label>
            <input
              type="text"
              name="fullName"
              id="inputFullName"
              required
              className="p-2 min-h-4 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="inputDOB">Tahun Lahir</label>
            <input
              type="number"
              name="DOB"
              id="inputDOB"
              min="1945"
              max="2035"
              required
              value={birthYear}
              className="p-2 min-h-4 rounded-md"
              onChange={(e) => {
                setBirthYear(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-8 flex justify-center items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gray-900 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-8 py-4 overflow-hidden border-2 rounded-full group"
          >
            Mulai
          </button>
        </form>
      </div>
    </div>
  );
}
