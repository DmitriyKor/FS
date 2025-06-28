import { useState } from 'react'
import { Provider } from 'react-redux';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { store } from './store/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <h1>my app</h1>
      </Provider>

    </>
  )
}

export default App
