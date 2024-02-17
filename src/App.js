import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteSate from './context/notes/noteContext';
import NotesBox from './components/NotesBox';

function App() {
  return (
    <>
      <NoteSate>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/notes" element={<NotesBox />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteSate>
    </>
  );
}

export default App;
