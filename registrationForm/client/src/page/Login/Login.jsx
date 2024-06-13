import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { MdEmail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slice/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  async function onHandleSubmit(e) {
    e.preventDefault();
    console.log(loginDetails);

    const loadingToastId = toast.loading("logging In...");

    try {
      const response = await dispatch(loginUser(loginDetails));
      
      if (response?.payload?.data?.success) {
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
      setLoginDetails({
        email: "",
    password: "",
    
      });
      navigate("/")

    }
    
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="flex min-h-screen flex-col justify-center items-center">
    <h1 className='text-4xl font-serif font-extrabold'>Login Now !</h1>
    <div className="w-96 mx-4 lg:mx-auto mt-10">
      <form onSubmit={onHandleSubmit}>
        <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <MdEmail />
            <input
              type="text"
              name="email"
              className="grow"
              placeholder="Email"
              value={loginDetails.email}
              onChange={onChangeInput}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
            <FaKey />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="grow "
              placeholder="Password"
              value={loginDetails.password}
              onChange={onChangeInput}
            />
            {showPassword ? (
              <FaEyeSlash
                className="cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaEye className="cursor-pointer" onClick={toggleShowPassword} />
            )}
          </label>
        </div>
        <div className="text-end">
      <Link to={"/forgot-password"}><a className="link link-primary font-serif font-medium">forgot password?</a></Link>
          
        </div>
        <div className="mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-serif font-semibold">
            <a className="link link-primary">Signup</a>
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;