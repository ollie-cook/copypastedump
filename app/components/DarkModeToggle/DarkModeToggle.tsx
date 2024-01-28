interface DarkModeToggleProps {
  handleClick: () => void
}

export default function DarkModeToggle(props: DarkModeToggleProps) {
  return(
    <button 
      className="absolute right-10 top-1.5 border border-neutral-300 rounded-md bg-neutral-100 p-1 text-sm hover:bg-neutral-200"
      onClick={props.handleClick}
    >
      Toggle Dark Mode
    </button>
  )
}