import './App.css';
/* eslint-disable no-unused-vars */
import Home from './containers/home/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
/* eslint-enable no-unused-vars */



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
