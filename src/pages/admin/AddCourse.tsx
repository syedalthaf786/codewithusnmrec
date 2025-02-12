import  { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import CourseList from './CourseList';
import AdminNavbar from '../../components/AdminNavbar';
interface AddCourseProps {
  isAdminLoggedIn: boolean;
  handleLogout: () => void;
}

const AddCourse: React.FC<AddCourseProps> = ({ isAdminLoggedIn, handleLogout }) => {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [totalLessons, setTotalLessons] = useState<number>(0);
  const [duration, setDuration] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [lessons, setLessons] = useState<{ title: string; description: string; video_url: string; content: string; assignment: string }[]>([]);

  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [lessonAssignment, setLessonAssignment] = useState('');

  useEffect(() => {
    setTotalLessons(lessons.length);
  }, [lessons]);

  const handleAddLesson = () => {
    if (lessonTitle.trim() && lessonDescription.trim()) {
      setLessons([...lessons, {
        title: lessonTitle,
        description: lessonDescription,
        video_url: lessonVideo,
        content: lessonContent,
        assignment: lessonAssignment,
      }]);

      setLessonTitle('');
      setLessonDescription('');
      setLessonVideo('');
      setLessonContent('');
      setLessonAssignment('');
    }
  };

  const handleRemoveLesson = (index: number) => {
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = courseId || uuidv4();

    supabase.from('courses').upsert([
      {
        id,
        title,
        description,
        category,
        level,
        totallessons: lessons.length,
        duration,
        image_url: imageUrl,
      },
    ]).then(({ error }) => {
      if (error) {
        console.error('Error saving course:', error);
        return;
      }
      setCourseId(id);
    });

    if (lessons.length > 0) {
      supabase.from('lessons').delete().match({ course_id: id }).then(() => {
        supabase.from('lessons').insert(
          lessons.map((lesson) => ({ ...lesson, course_id: id }))
        ).then(({ error: lessonError }) => {
          if (lessonError) {
            console.error('Error saving lessons:', lessonError);
          }
        });
      });
    }
  };

  return (
    <>
    {isAdminLoggedIn && <AdminNavbar handleLogout={handleLogout} />}

    <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">{courseId ? 'Update Course' : 'Add New Course'}</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Course Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded w-full py-2 px-3" required></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Level</label>
          <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Total Lessons</label>
          <input type="number" value={totalLessons} readOnly className="border rounded w-full py-2 px-3" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Duration</label>
          <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="border rounded w-full py-2 px-3" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Course Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border rounded w-full py-2 px-3" required />
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Add Lessons</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Lesson Title</label>
          <input type="text" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lesson Description</label>
          <input type="text" value={lessonDescription} onChange={(e) => setLessonDescription(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lesson Video URL</label>
          <input type="text" value={lessonVideo} onChange={(e) => setLessonVideo(e.target.value)} className="border rounded w-full py-2 px-3" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lesson Content</label>
          <textarea value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} className="border rounded w-full py-2 px-3"></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Lesson Assignment</label>
          <textarea value={lessonAssignment} onChange={(e) => setLessonAssignment(e.target.value)} className="border rounded w-full py-2 px-3"></textarea>
        </div>
        <button
          type="button"
          onClick={handleAddLesson}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full mt-2"
        >
          Add Lesson
        </button>
        {lessons.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Lessons Added:</h3>
            <ul className="list-disc pl-5">
              {lessons.map((lesson, index) => (
                <li key={index} className="text-gray-700">{lesson.title}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
          {courseId ? 'Update Course' : 'Add Course'}
        </button>
      </form>
    </div>
    <CourseList />
    </>
  );
};

export default AddCourse;
