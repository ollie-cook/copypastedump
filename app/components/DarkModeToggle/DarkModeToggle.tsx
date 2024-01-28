import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";

interface DarkModeToggleProps {
  darkMode: boolean,
  handleClick: () => void
}

export default function DarkModeToggle(props: DarkModeToggleProps) {
  return(
    <button 
      className="absolute right-10 top-1.5 border border-neutral-300 rounded-md bg-neutral-100 p-1 text-sm hover:bg-neutral-200 dark:bg-neutral-500 dark:border-neutral-400 dark:hover:bg-neutral-700"
      onClick={props.handleClick}
    >
      {
        props.darkMode == true ?
          <FiSun style={{color: "white"}} />
        :
          <FaMoon />
      }
      
    </button>
  )
}