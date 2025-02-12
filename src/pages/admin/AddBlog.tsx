import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Ensure the correct path to the Supabase client
import AdminNavbar from '../../components/AdminNavbar';

interface AddBlogProps {
  isAdminLoggedIn: boolean;
  handleLogout: () => void;
}

const AddBlog: React.FC<AddBlogProps> = ({ isAdminLoggedIn, handleLogout }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Insert the new blog post into the Supabase database
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([
        { title, content, image_url: imageUrl }
      ]);

    if (error) {
      console.error('Error adding blog post:', error);
    } else {
      console.log('Blog post added successfully:', data);
      // Optionally reset the form or redirect the user
      setTitle('');
      setContent('');
      setImageUrl('');
    }
  };

  return (
    <>
      {isAdminLoggedIn && <AdminNavbar handleLogout={handleLogout} />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-center">Add New Blog Post</h1>
          <div className="mb-4">
            <label className="block text-gray-700">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Add Blog Post
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlog;
