import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginCompnent from './view/LoginComponent';

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginCompnent />}>
        </Route>
      </Routes>
  );
}

export default App;
