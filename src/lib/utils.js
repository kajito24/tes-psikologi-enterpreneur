import { NextResponse } from "next/server";

/**
 * @param {number} status Response status
 * @param {object} data JSON data
 * @param {ResponseInit} init
 * Returns a Response object with a JSON body
 */
export function jsonResponse(status, data, init) {
  return new NextResponse(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}

/**
 * Score categories
 */
const scoreCategories = [
  {
    min: 0,
    max: 40,
    name: "veryLow",
    title: "Sangat Rendah",
    description:
      "Mungkin jiwa entrepreneur Anda belum berkembang. Jika tertarik, Anda bisa mulai mengasah keterampilan-keterampilan yang mendukung kewirausahaan.",
  },
  {
    min: 41,
    max: 60,
    name: "low",
    title: "Rendah",
    description:
      "Anda mungkin memiliki beberapa kualitas entrepreneur, tetapi perlu lebih banyak pengembangan dalam hal pengambilan risiko, kreativitas, atau ketekunan.",
  },
  {
    min: 61,
    max: 80,
    name: "medium",
    title: "Sedang",
    description:
      "Anda memiliki potensi besar sebagai entrepreneur. Dengan pengembangan lebih lanjut dalam area tertentu, Anda bisa menjadi lebih sukses di dunia kewirausahaan.",
  },
  {
    min: 81,
    max: 105,
    name: "high",
    title: "Tinggi",
    description:
      "Anda memiliki jiwa entrepreneur yang sangat kuat. Anda cenderung berani mengambil risiko, inovatif, dan tahan banting, kualitas yang penting untuk menjadi entrepreneur sukses.",
  },
];

/**
 * Get category of a score within the `scoreCategories`
 *
 * Returns the category name, title, and description
 *
 * Returns `Unknown` for all fields if the score is not in the category `min` and `max`
 * @param {number} score Score to get the category for
 * @returns {{name: string, title: string, description: string}} Category object of the score
 */
export const getScoreCategory = (score) => {
  for (const category of scoreCategories) {
    if (score >= category.min && score <= category.max) {
      const { name, title, description } = category;
      return { name, title, description };
    }
  }
  return { name: "Unknown", title: "Unknown", description: "Unknown" };
};
