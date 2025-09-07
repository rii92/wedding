import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import WeddingInvitation from './lib/WeddingInvitation';
import WeddingInvitation2 from './lib/WeddingInvitation2';
import WeddingInvitation3 from './lib/WeddingInvitation3';
import WeddingInvitation4 from './lib/WeddingInvitation4';
import WeddingInvitation5 from './lib/WeddingInvitation5';
import Home from './lib/Home';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/theme1" element={<WeddingInvitation />} />
        <Route path="/theme2" element={<WeddingInvitation2 />} />
        <Route path="/theme3" element={<WeddingInvitation3 />} />
        <Route path="/theme4" element={<WeddingInvitation4 />} />
        <Route path="/theme5" element={<WeddingInvitation5 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;





