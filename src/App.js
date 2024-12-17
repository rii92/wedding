import './App.css';
import { HashRouter } from 'react-router-dom';
import WeddingInvitation from './lib/WeddingInvitation';
import WeddingInvitation2 from './lib/WeddingInvitation2';

function App() {
  return (
    <HashRouter>
      <WeddingInvitation2 />
    </HashRouter>
  );
}

export default App;
