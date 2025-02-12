import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal, BookOpen, Search, Filter } from 'lucide-react';

const categories = [
  "All",
  "Web Development",
  "Python",
  "JavaScript",
  "Mobile Development",
  "Database",
  "DevOps"
];

export default function Tutorials() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const tutorials = [
    {
      id: 1,
      title: "Build a Full Stack App with Next.js 13",
      category: "Web Development",
      level: "Intermediate",
      duration: "2 hours",
      image: "https://source.unsplash.com/800x600/?coding,nextjs",
      icon: <Code className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Python Django REST API Tutorial",
      category: "Python",
      level: "Advanced",
      duration: "3 hours",
      image: "https://source.unsplash.com/800x600/?python,coding",
      icon: <Terminal className="h-5 w-5" />
    },
    {
      id: 3,
      title: "React Native Mobile App Development",
      category: "Mobile Development",
      level: "Beginner",
      duration: "4 hours",
      image: "https://source.unsplash.com/800x600/?mobile,app",
      icon: <BookOpen className="h-5 w-5" />
    }
  ].filter(tutorial => 
    selectedCategory === "All" || tutorial.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Programming Tutorials</h1>
          <p className="text-xl text-blue-100">
            Learn programming with our comprehensive tutorials
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search tutorials..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src={tutorial.image}
                alt={tutorial.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                  {tutorial.icon}
                  <span>{tutorial.category}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{tutorial.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>{tutorial.level}</span>
                  <span>{tutorial.duration}</span>
                </div>
                <Link
                  to={`/tutorial/${tutorial.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Start Learning →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}