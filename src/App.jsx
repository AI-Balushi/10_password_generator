import { useEffect, useCallback, useState } from "react";

function App() {

  const[length, setLength] = useState(0);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
  const[password, setPassword] = useState("");
  const[copyAlert, setCopyAlert] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += '0123456789';
    if(charAllowed) str += "!@#$%^&*()_+-=[]{}~`";

    for(let i = 1; i <= length; i++){
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    setCopyAlert(true);
  }

  setTimeout(() => {
    setCopyAlert(false);
  }, 10000);

  return (
    <>
      <div className={`fixed top-5 right-5 px-4 py-3 rounded-lg shadow-lg text-white transition-opacity duration-500 ${!copyAlert ? 'opacity-0' : 'opacity-100'} bg-gradient-to-r from-green-500 to-blue-500`} role="alert">
        <p>Password is Copied to Clipboard</p>
      </div> 

      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex justify-center items-center">
        <div className="w-full max-w-md shadow-lg rounded-lg px-6 py-8 bg-gray-700 bg-opacity-90">
          <h1 className="text-3xl text-center font-semibold text-lime-400 mb-6">AW Random PassGen</h1> 
          <div className="flex items-center shadow rounded-lg overflow-hidden mb-4">
            <input type="text" value={password} className="outline-none w-full py-2 px-4 text-lg bg-gray-600 text-white rounded-l-lg" placeholder="Generated Password" readOnly/>
            <button className="outline-none bg-lime-500 text-white px-4 py-2 hover:bg-lime-400 hover:text-gray-900 rounded-r-lg" onClick={copyToClipBoard}>Copy</button>
          </div>

          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="length" className="text-sm font-medium">Length: {length}</label>
              <input type="range" min={0} max={100} value={length} className="cursor-pointer" onChange={(e) => setLength(Number(e.target.value))}/>
            </div>

            <div className="flex items-center gap-x-2">
              <input type="checkbox" id="numberAllowed" checked={numberAllowed} onChange={() => setNumberAllowed(prev => !prev)} className="form-checkbox h-5 w-5 text-lime-500"/>
              <label htmlFor="numberAllowed" className="text-sm font-medium">Include Numbers</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input type="checkbox" id="charAllowed" checked={charAllowed} onChange={() => setCharAllowed(prev => !prev)} className="form-checkbox h-5 w-5 text-lime-500"/>
              <label htmlFor="charAllowed" className="text-sm font-medium">Include Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
