import './App.css';
import Navbar from '../src/components/navbar/navbar.component';
import FooterBar from './components/footer/footer.component';
import Intro from './components/intro/intro.component';
import Instruction from './components/instruction/instruction.component';
import CodeWindow from './components/instruction/code_window.component';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      <Instruction />
      <CodeWindow />
      <FooterBar />
    </div>
  );
}

export default App;
