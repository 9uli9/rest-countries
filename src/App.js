import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import components
import Navbar from "./components/Navbar";
import AfricanCountries from './pages/AfricanCountries'; 
import AmericanCountries from './pages/AmericanCountries'; 
import AsianCountries from './pages/AsianCountries'; 
import EuropeanCountries from './pages/EuropeanCountries'; 
import OceanicCountries from './pages/OceanicCountries'; 


import CustomNavbar from './components/Navbar';

//import pages
import Home from './pages/Home';
import SingleCountry from './pages/SingleCountry';


import { Container } from 'react-bootstrap';

const App = () => {
    return (
        <Container>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/country/:name' element={<SingleCountry />} />
                <Route path="/africa" element={<AfricanCountries />} />
                <Route path="/americas" element={<AmericanCountries />} />
                <Route path="/asia" element={<AsianCountries />} />
                <Route path="/europe" element={<EuropeanCountries />} />
                <Route path="/oceania" element={<OceanicCountries />} />
            </Routes>
        </Router>
        </Container>
    );
};

export default App;
