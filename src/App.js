import { useSelector } from 'react-redux';
import './App.css';
import FinalScreen from './components/FinalScreen';
import Question from './components/Question';
import Settings from './components/Settings';

function App() {

  const questions = useSelector((state) => state.questions)
  const questionIndex = useSelector((state) => state.index)

  let component
  

  if (questions.length && questionIndex + 1 <= questions.length) {
    component = <Question/>
  } else if (!questions.length) {
    component = <Settings />
  } else {
    component = <FinalScreen />
  }

  return (
    <div className="App">
      {component}
    </div>
  );
}

export default App;
