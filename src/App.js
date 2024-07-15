import "./index.css";
import Main from "./components/Main";
import CountryInfo from "./components/CountryInfo";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/" element={
          <div className="container">
            <Main />
          </div>
          } 
        />
        <Route path="/name/:countryName" 
          element={<CountryInfo />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
