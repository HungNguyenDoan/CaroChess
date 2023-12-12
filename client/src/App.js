
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import Home from './Component/Home';
import Level from './Component/Level';
import FE from './Component/FE';
import History from './Component/History';
import HistoryDetail from './Component/HistoryDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>  
      <Route path="/home" element={<Home />}></Route> 
      <Route path="/history" element={<History />}></Route> 
      <Route path="/level" element={<Level />}></Route> 
      <Route path="/play/:id/:symbol/:level/:hard" element={<FE />}></Route> 
      <Route path="/historydetail/:id" element={<HistoryDetail />}></Route> 
  </Routes>
  );
}

export default App;
