import { Posts } from './pages/Posts';
import { PostDetails } from './pages/PostDetails';
import { Home } from './pages/Home';
import { Comments } from './pages/Comments';
import { Photos } from './pages/Photos';
import { Users } from './pages/Users';
import { Settings } from './pages/Settings';

export const appContent = [
  { link: "/", text: "Home", el: <Home /> },
  { link: "/posts", text: "Posts", el: <Posts /> },
  { link: "/posts/:id", text: "Posts", el: <PostDetails /> },
  { link: "/comments", text: "Comments", el: <Comments /> },
  { link: "/photos", text: "Photos", el: <Photos /> },
  { link: "/users", text: "Users", el: <Users /> },  
  { link: "/albums", text: "Albums", el: <Posts /> },
  { link: "/todos", text: "Todos", el: <Posts /> },
  { link: "/settings", text: "Settings", el: <Settings/>},
];

export const apiURL = 'https://jsonplaceholder.typicode.com';
