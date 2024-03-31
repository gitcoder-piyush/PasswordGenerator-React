import logo from "./logo.svg";
import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
const[length, Setlength] = useState(8);
const[charAllowed, setCharAllowed] = useState(false)
const[NumberAllowed, setNumberAllowed] = useState(false)
const[password, setPassword] = useState("")

const passwordRef = useRef(null)
const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)},[password])

const passwordGenerator = useCallback(()=>{
let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(NumberAllowed){
str += "0123456789"
}
if(charAllowed){
  str += "!@#$%^&*()_-+{}[]?/<>,."
  }

for(let i = 1; i<=length; i++){
  let char = Math.floor(Math.random() * str.length + 1)
  pass += str.charAt(char)
}

setPassword(pass)

},[length,charAllowed,NumberAllowed,setPassword])

useEffect(()=>{passwordGenerator()},[length,charAllowed,NumberAllowed,passwordGenerator])
  return (
    <>
    <div id="lastContainer">
    <div id="outerContainer">
      <h1>Password Generator</h1>
    <div id="txtContainer">
      <textarea
        name="textarea"
        value={password}
        placeholder="Password"
        id="txt"
        cols="100"
        rows="3"
        readOnly
        ref={passwordRef}
      ></textarea>
      <button id="copybtn" onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className="buttons">
  <input type="range" min="8" max="100" value={length} class="slider" id="myRange" onChange={(e) =>{Setlength(e.target.value)}} />
  <label for="myRange">Length:{length} </label>
  <input type="checkbox" id="ALPHABETS" name="CHECKBOX" value={NumberAllowed} onChange={()=>{setNumberAllowed((prev)=> !prev)}}/>
  <label for="ALPHABETS">Numbers</label>
  <input type="checkbox" id="SpecialChar" name="CHECKBOX" value={charAllowed} onChange={()=>{setCharAllowed((prev)=> !prev)}} />
  <label for="SpecialChar">Characters</label>
</div>
      </div>
      </div>
    </>
  );
}

export default App;
