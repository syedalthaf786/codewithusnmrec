import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BookOpen, Clock, ChevronLeft, ChevronRight, CheckCircle, Copy } from 'lucide-react';

const CourseLesson = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [assignmentInput, setAssignmentInput] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (courseError) {
        console.error('Error fetching course:', courseError);
        setLoading(false);
        return;
      }

      const { data: lessonList, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', id)
        .order('created_at', { ascending: true });

      if (lessonError) {
        console.error('Error fetching lessons:', lessonError);
        setLoading(false);
        return;
      }

      setCourse(courseData);
      setLessons(lessonList);
      setLesson(lessonList[0] || null);
      setLoading(false);
    };

    fetchCourseData();
  }, [id]);

  const currentLessonIndex = lessons.findIndex((l) => l.id === lesson?.id);
  const totalLessons = lessons.length;

  const handlePrevLesson = () => {
    console.log('Previous button clicked');
    console.log('Current lesson index:', currentLessonIndex);
    if (currentLessonIndex > 0) {
      setLesson(lessons[currentLessonIndex - 1]);
    }
  };

  const handleNextLesson = async () => {
    console.log('Next button clicked');
    console.log('Current lesson index:', currentLessonIndex);

    if (!username) {
      alert('Please enter your username.');
      return;
    }

    const { data: assignment, error } = await supabase
      .from('assignments')
      .select('approved')
      .eq('lesson_id', lesson.id)
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching assignment:', error);
      return;
    }

    if (assignment && assignment.approved) {
      if (currentLessonIndex < lessons.length - 1) {
        setLesson(lessons[currentLessonIndex + 1]);
      }
    } else {
      alert('Your assignment for this lesson has not been approved yet.');
    }
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(lesson.content);
    alert('Content copied to clipboard!');
  };

  const handleAssignmentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from('assignments').insert([
      {
        username,
        content: assignmentInput,
        lesson_id: lesson.id,
        course_id: course.id,
        approved: false,
      },
    ]);

    if (error) {
      console.error('Error submitting assignment:', error);
    } else {
      alert('Assignment submitted successfully! Waiting for approval.');
      setUsername('');
      setAssignmentInput('');
    }
  };

   if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-black-500">
      <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
  if (!lesson) return <div>No lessons found for this course.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">{course?.title}</h1>
          <p className="text-xl text-blue-100 mb-4">{course?.description}</p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>Lesson {currentLessonIndex + 1} of {totalLessons}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{course?.duration || 'Unknown duration'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold text-lg mb-4">Course Content</h3>
            <div className="space-y-3">
              {lessons.map((l, index) => (
                <div
                  key={l.id}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                    index === currentLessonIndex ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setLesson(l)}
                >
                  {index < currentLessonIndex ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                  )}
                  <span className="text-sm">{l.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold">{lesson.title}</h2>
              {lesson.video_url && lesson.video_url.includes('watch?v=') && (
                <div className="my-4">
                  <iframe
                    width="100%"
                    height="315"
                    src={lesson.video_url.replace('watch?v=', 'embed/')}
                    title="Lesson Video"
                    allowFullScreen
                  />
                </div>
              )}
              <h5 className="text-gray-600 text">Description: {lesson.description}</h5>

              <div className="prose max-w-none relative">
                <button
                  onClick={handleCopyContent}
                  className="absolute top-2 right-2 bg-gray-200 p-1 rounded hover:bg-gray-300"
                  title="Copy content"
                >
                  <Copy className="h-5 w-5 text-gray-600" />
                </button>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto whitespace-pre-wrap">{lesson.content}</pre>
                <div className='bg-gray-30 font-bold text-center py-5'>
                 <h5 className=' font-bold'>Assignment: {lesson.assignment}</h5> 
                  <form onSubmit={handleAssignmentSubmit} className="mt-4">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Enter your username"
                      required
                    />
                    <textarea
                      value={assignmentInput}
                      onChange={(e) => setAssignmentInput(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your assignment here..."
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Submit Assignment
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                disabled={currentLessonIndex === 0}
                onClick={handlePrevLesson}
                className="btn"
              >
                <ChevronLeft /> Previous
              </button>
              <button
                disabled={currentLessonIndex === totalLessons - 1}
                onClick={handleNextLesson}
                className="btn"
              >
                Next <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLesson;
