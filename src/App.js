import { Route, Routes } from 'react-router-dom'

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProudcts from './pages/admin/AdminProudcts';
import AdminCoupons from './pages/admin/AdminCoupons';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin' element={<Dashboard />}>
          <Route path='products' element={<AdminProudcts />}></Route>
          <Route path='coupons' element={<AdminCoupons />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
