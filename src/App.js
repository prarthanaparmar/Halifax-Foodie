import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
// serviceWorker.register();

export default App;
