import './App.css';
import ControlledComponent from './components/2-10.form/ControlledComponent';
import UncontrolledComponent from './components/2-10.form/UncontrolledComponent';
import Composition from './components/2-4.props/Composition';
import Extraction from './components/2-4.props/Extraction/Extraction';
import ClassComponent from './components/2-5.state/ClassComponent';
import ClassComponent2 from './components/2-6.lifeCycle/ClassComponent';
import Event from './components/2-7.event/Event';
import List from './components/2-9.list/List'

function App() {
  return (
    <div className="App">
      <UncontrolledComponent />
      <ControlledComponent />
      <List />
      <Event />
      <ClassComponent2 />
      <ClassComponent />
      <Extraction />
      <Composition />
    </div>
  );
}

export default App;
