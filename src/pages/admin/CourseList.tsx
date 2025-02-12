import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const CourseList = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedDuration, setUpdatedDuration] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonDescription, setNewLessonDescription] = useState('');
  const [newLessonVideo, setNewLessonVideo] = useState('');
  const [newLessonContent, setNewLessonContent] = useState('');
  const [newLessonAssignment, setNewLessonAssignment] = useState('');
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [updatedLessonTitle, setUpdatedLessonTitle] = useState('');
  const [updatedLessonDescription, setUpdatedLessonDescription] = useState('');
  const [updatedLessonVideo, setUpdatedLessonVideo] = useState('');
  const [updatedLessonContent, setUpdatedLessonContent] = useState('');
  const [updatedLessonAssignment, setUpdatedLessonAssignment] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch courses and lessons from Supabase
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        id,
        title,
        category,
        duration,
        lessons (
          id,
          title,
          description,
          video_url,
          content,
          assignment
        )
      `);
    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data);
    }
  };

  // Handle course deletion
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) {
      console.error('Error deleting course:', error);
    } else {
      setCourses(courses.filter(course => course.id !== id)); // Update state
    }
  };

  // Open edit modal
  const handleEdit = (course: any) => {
    setEditingCourse(course);
    setUpdatedTitle(course.title);
    setUpdatedCategory(course.category);
    // setUpdatedLessons(course.lessons?.length || 0); // Removed as it is not defined
  };

  // Update course details
  const handleUpdate = async () => {
    if (!editingCourse) return;
    const { error } = await supabase.from('courses').update({
      title: updatedTitle,
      category: updatedCategory,
      duration: updatedDuration
    }).eq('id', editingCourse.id);

    if (error) {
      console.error('Error updating course:', error);
    } else {
      fetchCourses(); // Refresh courses after update
      setEditingCourse(null); // Close modal
    }
  };

  // Add a new lesson to a course
  const handleAddLesson = async (courseId: string) => {
    if (!newLessonTitle || !newLessonDescription || !newLessonVideo || !newLessonContent || !newLessonAssignment) return;

    const { error } = await supabase.from('lessons').insert([
      { 
        title: newLessonTitle, 
        description: newLessonDescription,
        video_url: newLessonVideo,
        content: newLessonContent,
        assignment: newLessonAssignment,
        course_id: courseId 
      }
    ]);

    if (error) {
      console.error('Error adding lesson:', error);
    } else {
      fetchCourses(); // Refresh courses after adding a lesson
      setNewLessonTitle('');
      setNewLessonDescription('');
      setNewLessonVideo('');
      setNewLessonContent('');
      setNewLessonAssignment('');
    }
  };

  // Open edit lesson modal
  const handleEditLesson = (lesson: any) => {
    setEditingLesson(lesson);
    setUpdatedLessonTitle(lesson.title);
    setUpdatedLessonDescription(lesson.description);
    setUpdatedLessonVideo(lesson.video_url);
    setUpdatedLessonContent(lesson.content);
    setUpdatedLessonAssignment(lesson.assignment);
  };

  // Update lesson details
  const handleUpdateLesson = async () => {
    if (!editingLesson) return;
    const { error } = await supabase.from('lessons').update({
      title: updatedLessonTitle,
      description: updatedLessonDescription,
      video_url: updatedLessonVideo,
      content: updatedLessonContent,
      assignment: updatedLessonAssignment
    }).eq('id', editingLesson.id);

    if (error) {
      console.error('Error updating lesson:', error);
    } else {
      fetchCourses(); // Refresh courses after update
      setEditingLesson(null); // Close modal
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Courses List</h2>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Lessons</th>
            <th className="border border-gray-300 px-4 py-2">Duration</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map(course => (
              <React.Fragment key={course.id}>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{course.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.category}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.lessons?.length || 0}</td>
                  <td className="border border-gray-300 px-4 py-2">{course.duration}</td>
                  <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {/* Display lessons */}
                {course.lessons?.map((lesson: any) => (
                  <React.Fragment key={lesson.id}>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="border border-gray-300 px-4 py-2 pl-8 text-gray-700">
                        📖 {lesson.title}
                        <button
                          className="ml-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                          onClick={() => handleEditLesson(lesson)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="border border-gray-300 px-4 py-2 pl-8 text-gray-700">
                        Description: {lesson.description}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="border border-gray-300 px-4 py-2 pl-8 text-gray-700">
                        Video URL: {lesson.video_url}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="border border-gray-300 px-4 py-2 pl-8 text-gray-700">
                        Content: {lesson.content}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="border border-gray-300 px-4 py-2 pl-8 text-gray-700">
                        Assignment: {lesson.assignment}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Add lesson row */}
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                      placeholder="New Lesson Title"
                      className="border rounded px-2 py-1 w-3/4 mr-2"
                    />
                    <input
                      type="text"
                      value={newLessonDescription}
                      onChange={(e) => setNewLessonDescription(e.target.value)}
                      placeholder="New Lesson Description"
                      className="border rounded px-2 py-1 w-3/4 mr-2"
                    />
                    <input
                      type="text"
                      value={newLessonVideo}
                      onChange={(e) => setNewLessonVideo(e.target.value)}
                      placeholder="New Lesson Video URL"
                      className="border rounded px-2 py-1 w-3/4 mr-2"
                    />
                    <input
                      type="text"
                      value={newLessonContent}
                      onChange={(e) => setNewLessonContent(e.target.value)}
                      placeholder="New Lesson Content"
                      className="border rounded px-2 py-1 w-3/4 mr-2"
                    />
                    <input
                      type="text"
                      value={newLessonAssignment}
                      onChange={(e) => setNewLessonAssignment(e.target.value)}
                      placeholder="New Lesson Assignment"
                      className="border rounded px-2 py-1 w-3/4 mr-2"
                    />
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleAddLesson(course.id)}
                    >
                      Add Lesson
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center text-gray-500">No courses available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            />
            <label className="block mb-2">Category:</label>
            <input
              type="text"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            />
            <label className="block mb-2">Duration:</label>
            <input
              type="text"
              value={updatedDuration}
              onChange={(e) => setUpdatedDuration(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                onClick={() => setEditingCourse(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Lesson Modal */}
      {editingLesson && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Lesson</h2>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={updatedLessonTitle}
              onChange={(e) => setUpdatedLessonTitle(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            />
            <label className="block mb-2">Description:</label>
            <input
              type="text"
              value={updatedLessonDescription}
              onChange={(e) => setUpdatedLessonDescription(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            />
            <label className="block mb-2">Video URL:</label>
            <input
              type="text"
              value={updatedLessonVideo}
              onChange={(e) => setUpdatedLessonVideo(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            />
            <label className="block mb-2">Content:</label>
            <textarea
              value={updatedLessonContent}
              onChange={(e) => setUpdatedLessonContent(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            ></textarea>
            <label className="block mb-2">Assignment:</label>
            <textarea
              value={updatedLessonAssignment}
              onChange={(e) => setUpdatedLessonAssignment(e.target.value)}
              className="border rounded w-full px-2 py-1 mb-3"
            ></textarea>

            <div className="flex justify-between">
              <button
                onClick={handleUpdateLesson}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                onClick={() => setEditingLesson(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
