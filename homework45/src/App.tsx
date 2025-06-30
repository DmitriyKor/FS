import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import { store } from './store/store'
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { NotFound } from './pages/notFound';


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/sign-in' element={<Home/>}/>
              <Route path='/sign-up' element={<Home/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='*' element={<NotFound/>}/>
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
