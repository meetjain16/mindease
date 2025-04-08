import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "../components/VoiceRecorder";
import Navbar from "../components/Navbar"
import { useUserStore } from "../stores/useUserStore";
import { motion } from "motion/react";

const DashboardPage = () => {
  const { sessionCount, incrementSessionCount, logout } = useUserStore();


  const {setUser,user} = useUserStore();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) navigate("/");
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dceff5] to-[#f5f8fa]">
        <div className="w-10 h-10 border-4 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    className="min-h-screen bg-gradient-to-br from-[#dceff5] to-[#f5f8fa] flex items-center justify-center p-4">
      <Navbar/>
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-10 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">MindEase Dashboard</h1>
          <div className="flex items-center gap-4">

            {/* User Photo */}
            {/* <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm flex justify-center items-center h-full text-white bg-teal-400">
                  {user?.email?.[0]?.toUpperCase()}
                </span>
              )}
            </div> */}

             
          </div>
        </div>

        {/* Interview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Listener */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#c0e7eb] to-[#e1f7f4] rounded-2xl p-6 shadow-md text-center border border-[#b5dee3]">
            <VoiceRecorder />
            <h2 className="text-lg font-semibold text-teal-800">AI Listener</h2>
            <p className="text-sm text-gray-600 mt-1">Your mental wellness companion</p>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center justify-center bg-[#f1f5f9] rounded-2xl p-6 shadow-md text-center border border-gray-200">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 mb-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="object-cover w-full h-full" />
              ) : (
                <span className="text-2xl flex items-center justify-center h-full text-white bg-teal-400">
                  {user?.email?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.displayName || user?.email}
            </h2>
            <p className="text-sm text-gray-500 mt-1">User</p>
          </div>
        </div>

        {/* Question/Prompt Area */}
        <div className="bg-white border border-teal-100 px-6 py-4 rounded-xl shadow-inner text-center text-gray-700 text-base font-medium">
          How are you feeling today?
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-6">
          <button className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 transition">
           Start Session
          </button>
          <button className="bg-red-400 text-white px-6 py-2 rounded-lg shadow hover:bg-red-500 transition"
           onClick={() => {
    incrementSessionCount();
    console.log("Session Count is now:", sessionCount);
  }}>
            End Session
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
