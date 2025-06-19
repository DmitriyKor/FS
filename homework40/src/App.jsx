import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {ControlledSearchForm} from './components/ControlledSearchForm.jsx'
import {UserForm} from './components/UserForm.jsx'
import {ControlledUserViewer} from './components/ControlledUserViewer.jsx'

function App() {
  return (
    <>
     <ControlledSearchForm/>    
     <UserForm/>   
     <ControlledUserViewer/>
    </>
  )
}

export default App
