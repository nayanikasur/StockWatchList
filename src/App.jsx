import Home from "./Home.jsx";
import WatchList from "./WatchList.jsx";
import Navbar from "./Navbar.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="watch-list" element={<WatchList />} />
      </Routes>
    </>

  );
}

export default App;
