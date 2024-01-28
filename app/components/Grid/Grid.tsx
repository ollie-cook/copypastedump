'use client'

import { useState, useEffect } from "react"
import { MdContentCopy } from "react-icons/md";
import Cookies from "js-cookie"

type Brick = {
  id: number,
  value: string
}

export default function Grid() {
  //get cookies on first render, use them to render bricks, this component won;t have state, individual bricks will, and they will update cookies themselves
  let initialBrickValues: Brick[] = [];
  if (Cookies.get("brickValues")!= undefined) {
    initialBrickValues = JSON.parse(Cookies.get("brickValues") || "[]")
  }

  return (
    <div className="w-screen min-h-screen grid grid-cols-2 gap-10 p-10">
      {
        Array.from(Array(8).keys()).map((index) => {
          const initialBrickValue = initialBrickValues.find(b => b.id === index);
          return <Brick key={index} id={index} initialValue={initialBrickValue?.value} />
        })
      }
    </div>
  )
}

interface BrickProps {
  id: number,
  initialValue: string | undefined
}

function Brick(props: BrickProps) {
  const [value, setValue] = useState(props.initialValue)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)

    //update cookie
    let currentCookies = Cookies.get("brickValues");
    if (currentCookies == undefined) {
      Cookies.set("brickValues", JSON.stringify([{id:props.id, value: e.target.value}]))
    } else {
      let currentBrickValues: Brick[] = JSON.parse(currentCookies);
      let updatedBrickValues: Brick[] = currentBrickValues;

      if (currentBrickValues.find(b => b.id === props.id) == undefined) {
        //brick not yet set in cookies
        updatedBrickValues.push({id: props.id, value: e.target.value})
      } else {
        //brick already set in cookies
        updatedBrickValues = currentBrickValues.map(b => {
          if (b.id === props.id) {
            return {id: props.id, value: e.target.value}
          } else {
            return b
          }
        })
      }
      

      Cookies.set("brickValues", JSON.stringify(updatedBrickValues))
    }
    
  }
  
  const handleClick = async () => {
    await navigator.clipboard.writeText(value || "");
  }

  return (
    <div className="relative w-full flex items-center bg-neutral-200 col-span-1 rounded-sm pl-8">
      <input 
        className="w-11/12 h-10 bg-transparent focus:outline-none focus:ring-0" 
        placeholder="Type here..." 
        type="text" 
        value={value}
        onChange={e => handleChange(e)}
      />
      <button className="absolute top-4 right-4" onClick={handleClick}>
        <MdContentCopy className="w-6 h-6" />
      </button>
    </div>
  )
}