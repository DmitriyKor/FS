import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Posts } from './pages/Posts';
import { PostDetails } from './pages/PostDetails';
import { Home } from './pages/Home';
import { Comments } from './pages/Comments';
import { Photos } from './pages/Photos';
import { Users } from './pages/Users';

const appContent = [
  { link: "/", text: "Home", el: <Home /> },
  { link: "/posts", text: "Posts", el: <Posts /> },
  { link: "/posts/:id", text: "Posts", el: <PostDetails /> },
  { link: "/comments", text: "Comments", el: <Comments /> },
  { link: "/photos", text: "Photos", el: <Photos /> },
  { link: "/users", text: "Users", el: <Users /> },  
  { link: "/albums", text: "Albums", el: <Posts /> },
  { link: "/todos", text: "Todos", el: <Posts /> }
];

function App() {
  return (
    <Router>
      <aside className="menu">
        <nav>
          <ul>
            {appContent.map((item, index) => {
              if (!item.link.includes(':')) {
                return (
                  <li key={index}>
                    <Link to={item.link}>{item.text}</Link>
                  </li>
                )
              }
            })}
          </ul>
        </nav>
      </aside>
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
