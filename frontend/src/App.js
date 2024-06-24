import './App.css';
/* eslint-disable no-unused-vars */
import Navbar from '../src/components/navbar/navbar.component';
import FooterBar from './components/footer/footer.component';
import Intro from './components/intro/intro.component';
import BriefMap from './components/instruction/briefmap.component';
import Instruction from './components/instruction/instruction.component';
import CodeWindow from './components/instruction/code_window.component';
import Register from './components/register/register.component';
/* eslint-enable no-unused-vars */



function App() {
  return (
    <div className="App">
      <Navbar />
      <Intro />
      {/* <BriefMap />
      <Instruction />
      <CodeWindow />
      <Register />
      <FooterBar /> */}
    </div>
  );
}

export default App;
