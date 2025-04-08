import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from "motion/react";



const testimonials = [
  {
    quote: "Being a mother of two, I barely have time to sit down and relax. I was surprised to discover during my therapy sessions that I had never noticed the sensations that run through my body when I simply sit with myself and breathe. My therapist at Heart It Out helped me find things that bring me joy and contentment. Therapy is truly a magical tool!",
    name: "Rhea Das",
    info: "Homemaker, 32",
  },
  {
    quote: "Therapy helped me become more mindful. I now notice my emotions instead of ignoring them, which has improved my relationships and work life.",
    name: "Arjun Mehta",
    info: "Software Engineer, 28",
  },
  {
    quote: "The support I received made me feel seen and heard. I no longer feel alone in my struggles and that’s been life-changing.",
    name: "Priya Shah",
    info: "Student, 22",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <motion.div
    
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    
    className="w-full flex flex-col items-center justify-center py-16 bg-white px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-teal-700 text-center mb-2">
        Why People Love MindEase
      </h2>
      <p className="text-center text-gray-600 text-lg mb-8">
        Life-changing turnarounds with the right support and guidance.
      </p>

      <div className="relative w-full max-w-3xl">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 text-center h-[300px] overflow-hidden flex flex-col justify-between">

          <div className="flex justify-center mb-4">
            <FaQuoteLeft className="text-teal-600 text-3xl" />
          </div>
          <p className="text-gray-700 text-base mb-6">{testimonials[current].quote}</p>
          <h3 className="font-semibold text-gray-800">{testimonials[current].name}</h3>
          <p className="italic text-sm text-gray-500">{testimonials[current].info}</p>
        </div>

        <button
          onClick={prev}
          className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>

      <div className="flex mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border border-teal-600 ${
              index === current ? 'bg-teal-600' : 'bg-transparent'
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TestimonialSlider;
