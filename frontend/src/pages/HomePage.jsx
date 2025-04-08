import React from "react";
import { Link } from "react-router-dom";
import Footer from "./FooterPage";
import { motion } from "motion/react";
import TestimonialSlider from "./TestimonialSlider";
const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-50 via-blue-100 to-teal-100 text-gray-800 font-sans">
      
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-teal-50 to-cyan-100">
        <motion.div 
         initial={{ opacity: 0.2, y: 100 }}
         transition={{ duration: 1 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false }}
        
        className="max-w-7xl mx-auto text-center px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-teal-700 mb-6 drop-shadow-sm">
            Welcome to MindEase
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-10">
            Your personal AI-powered mental wellness support companion. Track emotions, chat with AI, and improve your well-being.
          </p>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-xl transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-white to-sky-50 px-6">
        <motion.div 
        
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-teal-700 mb-14">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Track Your Mood",
                desc: "Monitor your emotional well-being and visualize trends over time.",
                icon: "📅",
              },
              {
                title: "Talk with AI",
                desc: "Chat with our empathetic AI to share thoughts and reduce stress.",
                icon: "🤖",
              },
              {
                title: "Get Insights",
                desc: "Powerful analytics to help understand your mind better.",
                icon: "📈",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-tr from-white via-teal-50 to-blue-100 p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-teal-700">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About / Why Us Section */}
      <section className="py-20 bg-gradient-to-br from-teal-700 to-cyan-600 text-white px-6">
        <motion.div

initial={{ opacity: 0.2, y: 100 }}
transition={{ duration: 1 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false }}
         className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why MindEase?</h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            In a fast-paced world, MindEase is your safe space to reflect, talk, and grow with the help of AI. Designed for mental wellness, privacy, and peace.
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap mt-6">
            <span className="bg-white text-teal-700 font-semibold py-2 px-4 rounded-full shadow-md">🌿 Friendly UI</span>
            <span className="bg-white text-teal-700 font-semibold py-2 px-4 rounded-full shadow-md">🔒 100% Private</span>
            <span className="bg-white text-teal-700 font-semibold py-2 px-4 rounded-full shadow-md">📱 Mobile Ready</span>
          </div>
        </motion.div>
      </section>


<TestimonialSlider/>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-50 to-white px-6">
        <motion.div
         initial={{ opacity: 0.2, y: 100 }}
         transition={{ duration: 1 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: false }}
        className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold text-teal-700 mb-4">
            Ready to take care of your mind?
          </h2>
          <p className="mb-6 text-gray-700">Join MindEase today and begin your journey to self-awareness.</p>
          <Link
            to="/auth"
            className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition"
          >
            Sign Up Free
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
