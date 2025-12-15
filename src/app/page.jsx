'use client'
import {trigerhelloworld,triggerSummarization}from './action'
import { useRef } from 'react'
const page = () => {

  let inputRef= useRef(null)

  const handleClick=async()=>{
    let theprompt=inputRef.current.value
    alert(theprompt)

    await triggerSummarization(theprompt)

    alert("event has been triggered")


  }


  return (
    <div>
      <div className='flex justify-center items-center'>
      <button onClick={trigerhelloworld} className='border-cyan-400 border-2 bg-black text-white h-16 w-60 mt-32 hover:border-emerald-400 rounded-3xl'>click to start</button>
      </div>


      <div className="flex flex-col items-center gap-6 mt-10">
      <textarea
  ref={inputRef}
  placeholder="Enter your text here..."
  rows={1}
  onInput={(e) => {
    const target = e.currentTarget;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  }}
  className="
    w-[28rem]
    px-6
    py-4
    text-xl
    text-white
    bg-black
    border-2
    border-cyan-400
    rounded-2xl
    resize-none
    overflow-hidden
    focus:outline-none
    focus:border-emerald-400
    placeholder-gray-400
  "
/>

  <button
    onClick={handleClick}
    className="
      px-10
      py-4
      text-xl
      font-semibold
      text-white
      bg-black
      border-2
      border-cyan-400
      rounded-2xl
      hover:border-emerald-400
      hover:scale-105
      transition-all
      duration-200
    "
  >
    Summarize
  </button>
</div>

      
    </div>
  )
}

export default page
