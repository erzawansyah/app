import type { Config } from "tailwindcss";
import tailwindTypography from "@tailwindcss/typography";
import tailwindForms from "@tailwindcss/forms";
import tailwindAspectRatios from "@tailwindcss/aspect-ratio";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warna-warna utama untuk tema neo-brutalism
        primary: {
          DEFAULT: "#ff5722", // Warna oranye terang untuk elemen aksi (misal tombol)
          dark: "#e64a19", // Warna oranye gelap untuk hover atau state aktif
        },
        black: "#000000", // Warna hitam tegas untuk border dan teks
        white: "#ffffff", // Warna putih untuk latar belakang
        gray: {
          light: "#f0f4f8", // Warna abu-abu sangat terang untuk latar belakang
          DEFAULT: "#9e9e9e", // Warna abu-abu netral
          dark: "#616161", // Warna abu-abu gelap untuk teks sekunder
        },
        red: {
          DEFAULT: "#f44336", // Warna merah untuk pesan error
        },
        green: {
          DEFAULT: "#4caf50", // Warna hijau untuk pesan sukses
        },
      },
      fontFamily: {
        // Font sans-serif yang tegas dan modern
        sans: ["Inter", "Arial", "sans-serif"],
      },
      fontSize: {
        // Ukuran font yang digunakan dalam desain
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
      },
      borderWidth: {
        // Border tebal untuk estetika neo-brutalism
        DEFAULT: "2px",
        "0": "0",
        "2": "2px",
        "4": "4px", // Digunakan untuk container utama
        "8": "8px",
      },
      borderRadius: {
        // Sudut yang sedikit membulat untuk sentuhan modern
        none: "0",
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        full: "9999px",
      },
      boxShadow: {
        // Shadow untuk memberikan kedalaman
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [tailwindTypography, tailwindForms, tailwindAspectRatios],
} satisfies Config;
