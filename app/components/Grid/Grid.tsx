'use client'

import { useState, useEffect } from "react"
import { MdContentCopy } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import Cookies from "js-cookie"

type Brick = {
  id: number,
  label: string | undefined,
  value: string | undefined
}

export default function Grid() {
  //get cookies on first render, use them to render bricks, this component won;t have state, individual bricks will, and they will update cookies themselves
  let initialBrickValues: Brick[] = [];
  if (Cookies.get("brickValues")!= undefined) {
    initialBrickValues = JSON.parse(Cookies.get("brickValues") || "[]")
  }

  return (
    <div className="w-full min-h-screen grid grid-cols-2 gap-4 p-4 md:p-10 md:gap-10 dark:bg-neutral-800">
      {
        Array.from(Array(8).keys()).map((index) => {
          const initialBrickValue = initialBrickValues.find(b => b.id === index);
          return <Brick key={index} id={index} initialLabel={initialBrickValue?.label} initialValue={initialBrickValue?.value} />
        })
      }
    </div>
  )
}

interface BrickProps {
  id: number,
  initialLabel: string | undefined,
  initialValue: string | undefined
}

function Brick(props: BrickProps) {
  const [value, setValue] = useState(props.initialValue)
  const [label, setLabel] = useState(props.initialLabel)
  const [showCopied, setShowCopied] = useState(false)

  useEffect(() => {
    let currentCookies = Cookies.get("brickValues");
    if (currentCookies == undefined) {
      Cookies.set("brickValues", JSON.stringify([{id:props.id, labe: label, value: value}]))
    } else {
      let currentBrickValues: Brick[] = JSON.parse(currentCookies);
      let updatedBrickValues: Brick[] = currentBrickValues;

      if (currentBrickValues.find(b => b.id === props.id) == undefined) {
        //brick not yet set in cookies
        updatedBrickValues.push({id: props.id, label: label, value: value})
      } else {
        //brick already set in cookies
        updatedBrickValues = currentBrickValues.map(b => {
          if (b.id === props.id) {
            return {id: props.id, label: label, value: value}
          } else {
            return b
          }
        })
      }

      Cookies.set("brickValues", JSON.stringify(updatedBrickValues))
    }
  }, [value, label])

  const handleChange = (e?: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e?.target.value || "")
  }
  
  const handleClick = async () => {
    await navigator.clipboard.writeText(value || "");
    setShowCopied(true)
    //set timer to set showCopied to false in 2 seconds
    setTimeout(() => {
      setShowCopied(false)
    }, 2000)
  }

  return (
    <div className="relative w-full h-40 flex items-center bg-neutral-200 col-span-2 rounded-sm pl-4 sm:pl-8 lg:col-span-1 lg:h-auto dark:bg-neutral-600">
      <input 
        className="absolute top-4 bg-transparent text-neutral-400 focus:outline-none focus:ring-0"
        placeholder="Label"
        value={label} 
        onChange={e => setLabel(e.target.value)} 
      />
      <textarea 
        className="w-11/12 h-12 translate-y-3 bg-transparent focus:outline-none focus:ring-0 dark:text-white" 
        placeholder="Type here..."  
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className="absolute top-0 right-0 flex flex-col items-end pr-2 pt-2">
        <button className="group relative h-8 w-8 flex justify-center items-center" onClick={handleClick}>
          <MdContentCopy className="w-6 h-6 group-hover:w-8 group-hover:h-8" />
        </button>
        {
          showCopied == true &&
          <div className="mt-2 p-2 rounded-sm border border-neutral-300 bg-neutral-500 dark:border-neutral-700">
            <p className="text-white">Copied to clipboard</p>
          </div>
        }
      </div>
      <button className="group absolute w-8 h-8 flex justify-center items-center bottom-2 right-2" onClick={() => handleChange()}>
        <FiDelete className="w-6 h-6 group-hover:w-8 group-hover:h-8" />
      </button>
    </div>
  )
}