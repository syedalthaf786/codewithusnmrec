// import React from 'react';
import { Code } from 'lucide-react'
const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "This platform has transformed my learning experience!",
    },
    {
      name: "Jane Smith",
      feedback: "The tutorials are clear and easy to follow.",
    },
    {
      name: "Alice Johnson",
      feedback: "I love the community and the resources available.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <p className="text-gray-600 mb-4">"{testimonial.feedback}"</p>
              <h3 className="font-semibold">{testimonial.name}</h3>
              <Code className="h-3 w-3 text-blue-600" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
