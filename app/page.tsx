'use client'

import { useState } from "react"
import Grid from "./components/Grid";
import DarkModeToggle from "./components/DarkModeToggle";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <main className={`${darkMode==true && "dark"}`}>
      <DarkModeToggle darkMode={darkMode} handleClick={() => setDarkMode(prev => !prev)} />
      <Grid />
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm dark:text-white">Built by <a href="https://www.olliecookie.com" className="underline" target="_blank">Ollie Cook</a>&#x1f36a;</p>
    </main>
  );
}
