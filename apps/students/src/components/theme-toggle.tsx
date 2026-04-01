//
//
// import { HugeiconsIcon } from "@hugeicons/react"
// import { Moon01Icon, Sun } from "@hugeicons/core-free-icons"
// import { Button } from "@workspace/ui/components/button"
// import { createContext, useContext } from "react"
//
//
// type Theme = "light" | "dark" | "system"
//
// interface ThemeContextType {
//   theme: Theme
//   setTheme: (theme: Theme) => void
//   resolvedTheme: "light" | "dark"
// }
//
// const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
//
// export function useTheme() {
//   const context = useContext(ThemeContext)
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider")
//   }
//   return context
// }
//
// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme()
//
//   const toggleTheme = () => {
//     if (theme === "light") setTheme("dark")
//     else if (theme === "dark") setTheme("system")
//     else setTheme("light")
//   }
//
//   return (
//     <Button
//       variant="outline"
//       size="icon"
//       className="px-2 hover:cursor-pointer"
//       onClick={toggleTheme}
//     >
//       {theme === "light" && <HugeiconsIcon icon={Sun} className="h-[1.2rem] w-[1.2rem]" />}
//       {theme === "dark" && <HugeiconsIcon icon={Moon01Icon} className="h-[1.2rem] w-[1.2rem]" />}
//       {theme === "system" && <span className="text-xs">SYS</span>}
//       <span className="sr-only">Toggle theme</span>
//     </Button>
//   )
// }
