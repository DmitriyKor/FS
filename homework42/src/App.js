import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Posts } from './pages/Posts';
import { Home } from './pages/Home';
import { Comments } from './pages/Comments';

const appContent = [{ link: "/", text: "Home", el: <Home /> },
{ link: "/posts", text: "Posts", el: <Posts /> }, { link: "/comments", text: "Comments", el: <Comments /> },
{ link: "/albums", text: "Albums", el: <Posts /> }, { link: "/photos", text: "Photos", el: <Posts /> },
{ link: "/todos", text: "Todos", el: <Posts /> }, { link: "/users", text: "Users", el: <Posts /> }];

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {appContent.map((item, index) => {
              return (
                <li>
                  <Link to={item.link} key={index}>{item.text}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
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
