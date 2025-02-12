import React, { useState } from 'react';
import { Code } from 'lucide-react'
const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription logic here
    console.log(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-8">Get the latest updates and tutorials directly in your inbox. <Code className="h-4 w-4 text-blue-600" /></p>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-l-lg"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">
            Subscribe
          </button>
        </form>
        {/* <Code className="h-8 w-8 text-blue-600" /> */}
      </div>
    </section>
  );
};

export default Newsletter;
