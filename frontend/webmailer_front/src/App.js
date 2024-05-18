import './App.css';
import Navbar from '../src/components/navbar/navbar.component';
import FooterBar from './components/footer/footer.component';
import Intro from './components/intro/intro.component';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <FooterBar />
    </div>
  );
}

export default App;
