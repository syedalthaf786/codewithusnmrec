import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  video_url: string;
  source_url: string;
  category: string;
  image_url: string;
  created_at: string;
}

const ViewProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
  if (!project) return <div className="flex justify-center items-center min-h-screen">
    <div>Project not found</div>;
  </div>
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-1/10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Project Overview</h2>
        <div className="mb-4">
          <span className="block text-gray-700 font-medium mb-2">{project.category}</span>
        </div>
        <div className="mb-4">
          <button
            onClick={() => setContent('source')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Github className="h-5 w-5" />
            Source Code
          </button>
        </div>
        {project.video_url && (
          <div className="mb-4">
            <button
              onClick={() => setContent('video')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <span>Watch Video</span>
            </button>
          </div>
        )}
        <div className="mb-4">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-9/10 bg-white p-8 rounded-lg shadow-md ml-4" style={{ width: '100%' }}>
        {content === 'source' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Source Code</h2>
            <a
              href={project.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Github className="h-5 w-5" />
              View Source Code
            </a>
          </div>
        )}
        {content === 'video' && project.video_url && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Video</h2>
            <iframe
              width="100%"
              height="495"
              src={project.video_url.replace('watch?v=', 'embed/')}
              title="Project Video"
              allowFullScreen
            />
          </div>
        )}
        {!content && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
            <div className="mb-4">
              <img
                src={project.image_url}
                alt={project.title}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-between">
              {project.video_url && (
                <button
                  onClick={() => setContent('video')}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <span>Watch Video</span>
                </button>
              )}
              <button
                onClick={() => setContent('source')}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Github className="h-5 w-5" />
                Source Code
              </button>
            </div>
            {/* Add your project content here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProject;