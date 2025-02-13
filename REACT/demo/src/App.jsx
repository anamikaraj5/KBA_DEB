import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Logos from './Logos'

function App() {
  const [count, setCount] = useState(0)
  const [liked, settoggle] = useState(false)

  function setlike()
  {
    settoggle((prevlike) =>  !prevlike)
  }
  return (
    <>
      <Logos/>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <button className='heart' onClick={setlike}> {liked?'LIKED':'LIKE'} </button>
      </div>
    </>
  )
}

export default App
