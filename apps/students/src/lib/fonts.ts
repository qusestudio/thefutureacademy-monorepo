import localFont from "next/font/local"

export const chillax = localFont({
  src: [
    {
      path: "../../../../packages/ui/src/styles/fonts/chillax/Chillax-Variable.woff2",
      weight: "200 700",
      style: "normal",
      variable: "--font-chillax",
    },
  ],
  variable: "--font-chillax",
})
