import axios from "axios";
import { useEffect } from "react";


function App() {
  useEffect(() => {
    // console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH)

    // console.log(`${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)

    (async () => {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`)
      console.log(res)
    })()
  }, [])
  return (
    <div className="App">
    </div>
  );
}

export default App;
