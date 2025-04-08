import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Navbar from "../components/Navbar"
import { useUserStore } from "../stores/useUserStore";


import { motion } from "motion/react";
const moodData = [
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 0 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 0 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 3 },
  { date: "Apr 7", mood: 3 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 3 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 0 },
  { date: "Apr 7", mood: 0 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 1 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 0 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 0 },
  { date: "Apr 7", mood: 2 },
  { date: "Apr 7", mood: 0 },
];


const AnalyticsPage = () => {
    const {user,sessionCount} = useUserStore();
    
    
  return (
    
    <div>
        <Navbar   />
        <motion.div 
        
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="min-h-screen bg-gradient-to-br from-[#dceff5] to-[#f5f8fa] p-6 mt-14">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-teal-700">Your Analytics</h1>

        {/* Mood Over Time */}
        <div className="bg-[#f1f5f9] rounded-2xl p-6 shadow border border-gray-200">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">Mood Over the Week</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 3]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Session Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#c0e7eb] to-[#e1f7f4] rounded-2xl p-6 text-center border border-[#b5dee3] shadow">
            <h3 className="text-2xl font-bold text-teal-700">{sessionCount}</h3>
            <p className="text-sm text-gray-600 mt-1">Sessions This Week</p>
          </div>

          <div className="bg-gradient-to-br from-[#c0e7eb] to-[#e1f7f4] rounded-2xl p-6 text-center border border-[#b5dee3] shadow">
            <h3 className="text-2xl font-bold text-teal-700">24 min</h3>
            <p className="text-sm text-gray-600 mt-1">Total Talk Time</p>
          </div>
        </div>

        {/* Emotion Word Cloud (Mockup) */}
        <div className="bg-[#f9fafb] rounded-2xl p-6 border border-gray-200 shadow">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">Emotion Word Cloud</h2>
          <p className="text-gray-500 text-sm mb-4">Top emotions identified from your voice inputs</p>
          <div className="flex flex-wrap gap-3 text-gray-700">
            {["anxious", "calm", "stressed", "motivated", "sad", "hopeful"].map((word, i) => (
              <span
                key={i}
                className={`text-${(i + 3) * 100} text-lg font-medium px-3 py-1 bg-teal-${(i + 4) * 100} bg-opacity-20 rounded-full`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white border border-teal-100 rounded-xl p-6 shadow-inner text-gray-700">
          <h2 className="text-xl font-semibold text-teal-600 mb-2">AI Listener Feedback</h2>
          <p className="text-sm leading-relaxed">
            Based on your recent conversations, you seem to be making progress in expressing your feelings.
            The AI detected a higher level of calmness in your tone compared to previous weeks.
            Keep up the good work!
          </p>
        </div>
      </div>
     </motion.div>
    </div>
    
  );
};

export default AnalyticsPage;
