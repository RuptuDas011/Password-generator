import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const  [length ,setlength]=useState(8)
  const  [number,setnumber]=useState(false);
  const  [character , setcharacter]=useState(false);
  const  [password , setpassword]=useState("")


// useRef Hook 

  const passwordRef = useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+= "01234456789"
    if(character) str+= "!@#$%^&*-_+=[]{}~"
  
   for(let i=1;i<=length;i++){
    let char = Math.floor (Math.random()*str.length+1)
    pass += str.charAt(char)
  }
  
  setpassword(pass)
 
  
},  [length , number,character,setpassword])

const copyPassword = useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,20);
  window.navigator.clipboard.writeText(password)
},[password])
useEffect (()=> {passwordGenerator()},[length , number,character,passwordGenerator])

  return (
    <>
         <div className=" max-w  mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
         <h1 className='text-white text-center my-3'>Password generator</h1>
         <div className="flex shadow rounded-lg overflow-hidden mb-4"></div>
         <input type="text" value={password} 
         className="outline-none w-full py-1 px-3"
         placeholder='Password'
         readOnly
         ref={passwordRef} />

         <button 
         
         onClick={copyPassword}
         
         className='bg-blue-700 text-white px-3 py-0.5 my-2 shrink-0'>Copy</button>
          
         <div className='flex text-sm gap-x-2'>

<div className='flex items-center gap-x-1'>
  <input type="range" min={6} max={20} value={length} className='cursor-pointer'
  onChange={(e)=>{setlength(e.target.value)}}
  />

    <label htmlFor="">Length:{length}</label>

</div>

<div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
              setnumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>


      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={character}
          id="charInput"
          onChange={() => {
              setcharacter((prev) => !prev);
          }}
      />
      <label htmlFor="charInput">Characters</label>
      </div>
         </div>

         



         </div>


        
    </>
  )
}

export default App
