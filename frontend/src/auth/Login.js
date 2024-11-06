import React, { useContext, useState } from 'react';
import Header from '../components/layout/Header/Header';
import axios from 'axios';
import  UserContext  from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

//withCredentials: true,  // Ensures cookies are sent with the request

const Login = () => {
  const navigate = useNavigate()

   const {setUser} = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(true); // state to toggle between login and signup


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }


  console.log(process.env.REACT_APP_SERVER);

  const handleLogin = async () => {
    console.log('Logging in...');
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/v1/login`, 
        { email: formData.email, password: formData.password }, {
            withCredentials: true, // Include cookies with the request
        });
        const { user, token } = res.data;
        console.log(user);
        setUser(user);  // Update user in context
        Cookies.set('token', token); // Store the token in cookies
        Cookies.set('user', JSON.stringify(user)); // Store user info in cookies
        navigate('/'); // Redirect to home
    } catch (error) {
        console.error("Login error:", error);
    }
};


  const handleSignup = async () => {
    // Handle signup logic here
    console.log('Signing up...');

    if (formData.password !== formData.confirmPassword) {
      console.log("Password does not match!");
      return;
    }

    await axios.post(process.env.REACT_APP_SERVER + "/api/v1/register", { name: formData.name, email: formData.email, password: formData.password })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      })


  };

  //later ahndle logut
  // auth.logOut();


  return (

    <>
      <Header />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Signup'}
        </h2>
        <div className="flex flex-col space-y-4">
          {!isLogin && (<> <label  className="font-medium">Enter Your Name</label>
            <input
            name="name"
              value={formData.name}
              type="text"
              className="border rounded-lg p-2"
              placeholder="Name"
              onChange={handleChange}
            /> </>)
          }
          <label className="font-medium">Enter Your Email</label>
          <input
           name="email"
            value={formData.email}
            type="email"
            className="border rounded-lg p-2"
            placeholder="Email"
            onChange={handleChange}
          />

          <label  className="font-medium">Enter Your Password</label>
          <input
          name="password"
            value={formData.password}
            type="password"
            className="border rounded-lg p-2"
            placeholder="Password"
            onChange={handleChange}
          />

          {!isLogin && (
            <>
              <label className="font-medium">Confirm Password</label>
              <input
               name="confirmPassword" 
                value={formData.confirmPassword}
                type="password"
                className="border rounded-lg p-2"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={isLogin ? handleLogin : handleSignup}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              disabled={!formData.email || !formData.password || (!isLogin && !formData.name)}
            >
              {isLogin ? 'Login' : 'Signup'}
            </button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500"
            >
              {isLogin ? 'Need an account? Signup' : 'Have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login; 
