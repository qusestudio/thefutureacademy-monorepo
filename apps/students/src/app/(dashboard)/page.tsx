import React from "react"
import { chillax } from "@/lib/fonts"

const HomePage = () => {
  return (
    <div className="flex w-full max-w-7xl flex-col gap-y-2 self-center font-sans">
      <h1 className={`text-7xl font-chillax font-semibold uppercase`}>The Future Academy</h1>
      <p className="text-sm">
        Add the following to your styles/globals.css file. You can learn more
        about using CSS variables for theming in the theming section.
      </p>
    </div>
  )
}

export default HomePage
