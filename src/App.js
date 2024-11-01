import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleCountry from "./pages/SingleCountry";
import SingleDish from "./pages/SingleDish";
import AfricanCountries from "./pages/AfricanCountries";
import AmericanCountries from "./pages/AmericanCountries";
import AsianCountries from "./pages/AsianCountries";
import EuropeanCountries from "./pages/EuropeanCountries";
import OceanicCountries from "./pages/OceanicCountries";
import { Container } from "react-bootstrap";
import "./styles/App.css";

//defining routes and components

const App = () => {
  return (
    <Container
      fluid
      style={{ backgroundColor: "#54381d", minHeight: "100vh", color: "black" }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:name" element={<SingleCountry />} />
          <Route path="/dish/:name" element={<SingleDish />} />
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
