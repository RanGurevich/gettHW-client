import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DisplayUsers from './compoments/Users/DisplayUsers'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DisplayUsers/>
    </>
  )
}

export default App
