import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Ask from "./pages/Ask";
import History from "./pages/History";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/ask" element={<Ask />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </>
  );
}

export default App;