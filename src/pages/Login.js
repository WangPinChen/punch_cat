import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const [loginState, setLoginState] = useState({})
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    try {
      const res = await axios.post(`v2/admin/signin`, data)
      const { token, expired } = res.data
      document.cookie = `hexToken=${token};expired=${expired}`
      navigate('/admin')
    } catch (error) {
      console.log(error.response.data)
      setLoginState(error.response.data)
    }

  }

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = token;
    (async () => {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`)
      console.log(res.data)
    })()
  }, [])

  return (<div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>登入帳號</h2>

        {loginState.message && (<div className="alert alert-danger" role="alert">
          {loginState.message}
        </div>)}

        <div className="mb-2">
          <label htmlFor="email" className="form-label w-100">
            Email
            <input id="email" className="form-control" name="username" type="email" placeholder="Email Address"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label w-100">
            密碼
            <input type="password" className="form-control" name="password" id="password" placeholder="name@example.com"
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" className="btn btn-primary"
          onClick={submit}
        >登入</button>
      </div>
    </div>
  </div>)
}

export default Login;