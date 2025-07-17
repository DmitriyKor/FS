import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';

import { Home } from './pages/home';
import { NotFound } from './pages/notFound';
import { fetchCategories } from './store/category';
import { mainTheme } from './shared/styles/theme'
import { fetchHistory } from './store/history';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { useToken } from './helpers/auth';
import { Logout } from './pages/logout';


function App() {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    useToken();
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
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
