import './App.css';

import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
