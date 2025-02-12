import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Users, BarChart } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AssignmentList from './AssignmentList';
import AdminNavbar from '../../components/AdminNavbar';

interface Feedback {
  id: number;
  email: string;
  feedback: string;
  created_at: string;
}

interface DashboardProps {
  isAdminLoggedIn: boolean;
  handleLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isAdminLoggedIn, handleLogout }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedbacks:', error);
      } else {
        setFeedbacks(data);
      }
      setLoading(false);
    };

    fetchFeedbacks();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdminLoggedIn && <AdminNavbar handleLogout={handleLogout} />}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BookOpen className="h-10 w-10 text-indigo-600" />
              <div className="ml-4">
                <p className="text-gray-500">Total Courses</p>
                <h3 className="text-2xl font-bold">24</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="h-10 w-10 text-green-600" />
              <div className="ml-4">
                <p className="text-gray-500">Blog Posts</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-10 w-10 text-blue-600" />
              <div className="ml-4">
                <p className="text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">2,845</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <BarChart className="h-10 w-10 text-purple-600" />
              <div className="ml-4">
                <p className="text-gray-500">Revenue</p>
                <h3 className="text-2xl font-bold">$12,450</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/new-course"
              className="bg-indigo-600 text-white px-4 py-2 rounded text-center hover:bg-indigo-700"
            >
              Add New Course
            </Link>
            <Link
              to="/admin/new-blog"
              className="bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
            >
              Create Blog Post
            </Link>
            <Link
              to="/admin/new-project"
              className="bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
            >
              Add New Project
            </Link>
          </div>
        </div>
        
        {/* Recent Activity */}
        <AssignmentList />

        {/* Feedback Table */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Feedback</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Feedback</th>
                <th className="py-2 px-4 border-b">Created At</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td className="py-2 px-4 border-b">{feedback.id}</td>
                  <td className="py-2 px-4 border-b">{feedback.email}</td>
                  <td className="py-2 px-4 border-b">{feedback.feedback}</td>
                  <td className="py-2 px-4 border-b">{new Date(feedback.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
