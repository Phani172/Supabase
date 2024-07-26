import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPlayerForm from "./AddPlayerForm";
import UpdatePlayerForm from "./UpdatePlayerForm";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-player" element={<AddPlayerForm />} />
        <Route path="/update-player" element={<UpdatePlayerForm />} />
      </Routes>
    </Router>
  );
}

export default App;

