import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { NotFound } from './pages/notFound';
import { useEffect } from 'react';
import { fetchUser } from './store/user';
import { fetchCategories } from './store/category';
import { mainTheme } from './shared/themes'

function App() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCategories());
  }, []);

  //const [theme, setTheme] = useState(mainTheme);
  // to pass setTheme as a props to where the theme is selected
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/sign-in' element={<Home />} />
            <Route path='/sign-up' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
