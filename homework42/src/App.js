import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { appContent } from './const';
import { NavMenu } from './components/NavMenu';

function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        {appContent.map((item, index) => {
          return (
            <Route path={item.link} element={item.el} key={index} />
          )
        })}
      </Routes>
    </Router>
  );
}

export default App;
