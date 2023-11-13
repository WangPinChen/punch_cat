import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom'

import Login from "./pages/Login";


function App() {
  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
  //     console.log(res)
  //   })()
  // }, [])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
