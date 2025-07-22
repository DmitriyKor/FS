import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';

import { Wallet } from './pages/wallet';
import { NotFound } from './pages/notFound';
import { fetchCategories } from './store/category';
import { mainTheme } from './shared/styles/theme'
import { fetchHistory } from './store/history';
import { Login } from './pages/login';
import { Home } from './pages/home';
import { Register } from './pages/register';
import { useToken } from './helpers/auth';
import { Logout } from './pages/logout';
import { fetchUser } from './store/user';


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    useToken();
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchHistory());
  }, [user]);

  //const [theme, setTheme] = useState(mainTheme);
  // to pass setTheme as a props to where the theme is selected
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
            {user.data ?
              <>
                <Route path='/logout' element={<Logout />} />
                <Route path='/wallet' element={<Wallet />} />
              </> :               
              <>            
                <Route path='/logout' element={<Logout />} />
                <Route path='/wallet' element={<Logout />} />
              </>
            }
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
