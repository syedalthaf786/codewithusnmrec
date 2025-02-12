import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Search } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: "Understanding React Server Components",
      excerpt: "Learn how React Server Components work and how they can improve your application's performance",
      author: "John Doe",
      date: "Mar 1, 2024",
      readTime: "5 min read",
      category: "React",
      image: "https://source.unsplash.com/800x600/?react,programming"
    },
    {
      title: "Building Scalable APIs with Node.js",
      excerpt: "Best practices for building production-ready APIs using Node.js and Express",
      author: "Jane Smith",
      date: "Feb 28, 2024",
      readTime: "8 min read",
      category: "Backend",
      image: "https://source.unsplash.com/800x600/?server,code"
    },
    {
      title: "Getting Started with TypeScript",
      excerpt: "A comprehensive guide to TypeScript for JavaScript developers",
      author: "Mike Johnson",
      date: "Feb 27, 2024",
      readTime: "6 min read",
      category: "TypeScript",
      image: "https://source.unsplash.com/800x600/?typescript,development"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100">
            Latest articles, tutorials, and coding tips
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <article key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  <Link to={`/blog/${i + 1}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}