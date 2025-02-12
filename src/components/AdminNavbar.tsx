import React from 'react';
import { Link } from 'react-router-dom';

interface AdminNavbarProps {
  handleLogout: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ handleLogout }) => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/admin" className="text-xl font-bold">
              Admin Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;