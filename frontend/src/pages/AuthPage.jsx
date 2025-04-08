// src/pages/AuthPage.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async () => {
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  navigate('/dashboard');
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#dbeafe] via-[#e0f2fe] to-[#f0fdf4]">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[90%] max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          {isSignUp ? "Create Your CalmSpace" : "Welcome Back 💙"}
        </h2>

        <input
          className="w-full border border-blue-300 rounded-md p-2 mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border border-blue-300 rounded-md p-2 mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleEmailAuth}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md mb-3 transition"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-blue-400 text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        <p
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm text-center text-blue-500 mt-4 cursor-pointer"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "New here? Create an account"}
        </p>

        {loading && (
          <div className="mt-4 flex justify-center">
            <div className="w-6 h-6 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
