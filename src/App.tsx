import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlitchDemo from './pages/GlitchDemo';

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Routes>
          {/* Make GlitchDemo the default home page */}
          <Route path="/" element={<GlitchDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;