import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import CRUD from "./pages/CRUD.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route exact path="/crud" element={<CRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
