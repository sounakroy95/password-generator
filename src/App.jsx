import { useState, useCallback, useEffect, useRef } from "react"

const App = () => {
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(
    () => {
      let passwordString = "";
      let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

      if (isNumberAllowed) {
        str += '123456789';
      }

      if (isCharAllowed) {
        str += '!@#$%^&*()_+';
      }

      for (let i = 1; i < length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        passwordString += str.charAt(char);
      }
      setPassword(passwordString);
    },
    [length, isNumberAllowed, isCharAllowed],
  );

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharAllowed, generatePassword]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  const passwordRef = useRef(null);



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">My Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text" value={password} className="outline-none w-full py-1 px-3" placeholder="password" readOnly ref={passwordRef} />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={() => {
            copyPasswordToClipboard();
          }}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name=""
              id=""
              min={8}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={isNumberAllowed}
              type="checkbox"
              name="numbers"
              id="numForInput"
              onChange={() => {
                setIsNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={isCharAllowed}
              type="checkbox"
              name="characters"
              id="charForInput"
              onChange={() => {
                setIsCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App