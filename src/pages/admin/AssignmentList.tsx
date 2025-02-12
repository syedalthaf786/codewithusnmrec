import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const AssignmentList = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('assignments')
        .select(`
          id,
          username,
          content,
          created_at,
          approved,
          lessons (
            title
          ),
          courses (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching assignments:', error);
        setLoading(false);
        return;
      }

      setAssignments(data);
      setLoading(false);
    };

    fetchAssignments();
  }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('assignments')
      .update({ approved: true })
      .eq('id', id);

    if (error) {
      console.error('Error approving assignment:', error);
    } else {
      setAssignments(assignments.map(assignment => 
        assignment.id === id ? { ...assignment, approved: true } : assignment
      ));
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting assignment with id:', id);
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting assignment:', error);
    } else {
      console.log('Assignment deleted successfully');
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    }
  };

  if (loading) return <div>Loading assignments...</div>;

  return (
    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Assignments List</h2>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Course</th>
            <th className="border border-gray-300 px-4 py-2">Lesson</th>
            <th className="border border-gray-300 px-4 py-2">Content</th>
            <th className="border border-gray-300 px-4 py-2">Submitted At</th>
            <th className="border border-gray-300 px-4 py-2">Approved</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 ? (
            assignments.map(assignment => (
              <tr key={assignment.id}>
                <td className="border border-gray-300 px-4 py-2">{assignment.username}</td>
                <td className="border border-gray-300 px-4 py-2">{assignment.courses.title}</td>
                <td className="border border-gray-300 px-4 py-2">{assignment.lessons.title}</td>
                <td className="border border-gray-300 px-4 py-2">{assignment.content}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(assignment.created_at).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{assignment.approved ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {!assignment.approved && (
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleApprove(assignment.id)}
                    >
                      Approve
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center text-gray-500">No assignments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentList;