import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { appContent } from './const';
import { NavMenu } from './components/NavMenu';
import { UpperBar } from './components/UpperBar';
import { AppThemeProvider, ThemeContext, ThemeProvider } from './context/AppThemeContext';
import { AppLangProvider, LangContext, LangProvider } from './context/AppLangContext';

function App() {
  return (
    <Router>
      <AppThemeProvider>
        <AppLangProvider>
          <UpperBar />
          <NavMenu />
          <Routes>
            {appContent.map((item, index) => {
              return (
                <Route path={item.link} element={item.el} key={index} />
              )
            })}
          </Routes>
        </AppLangProvider>
      </AppThemeProvider>
    </Router>
  );
}

export default App;
