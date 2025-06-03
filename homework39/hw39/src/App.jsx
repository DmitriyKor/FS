import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Title} from './components/Title.jsx'
import {SimpleBanner} from './components/SimpleBanner.jsx'

function App() {
  const imageArray = ['./img0.jpg', './img1.jpg', './img2.jpeg'];
  
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Title id="0" header="Science fiction" description="the science fiction books are listed here"/>
      <Title id="1" header="Books for kids" description="Fairy tales, etc."/>

      <SimpleBanner images={imageArray}></SimpleBanner>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
