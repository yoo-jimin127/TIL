import './App.css';
import Composition from './components/2-4.props/Composition';
import Extraction from './components/2-4.props/Extraction/Extraction';
import ClassComponent from './components/2-5.state/ClassComponent';
import ClassComponent2 from './components/2-6.lifeCycle/ClassComponent';
import Event from './components/2-7.event/Event';

function App() {
  return (
    <div className="App">
      <Event />
      <ClassComponent2 />
      <ClassComponent />
      <Extraction />
      <Composition />
    </div>
  );
}

export default App;
