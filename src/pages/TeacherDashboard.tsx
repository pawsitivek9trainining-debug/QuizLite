import { Plus } from 'lucide-react';

function TeacherDashboard() {
  const dummyQuizzes = [
    { id: 1, title: 'Math Quiz 1', classroom: 'Algebra 101', updated: '2 days ago' },
    { id: 2, title: 'Science Test', classroom: 'Biology 201', updated: '5 days ago' },
    { id: 3, title: 'History Quiz', classroom: 'World History', updated: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Classrooms</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="py-2 px-3 bg-gray-50 rounded">Algebra 101</p>
              <p className="py-2 px-3 bg-gray-50 rounded">Biology 201</p>
              <p className="py-2 px-3 bg-gray-50 rounded">World History</p>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
              <Plus size={18} />
              Create Classroom
            </button>
          </div>

          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Quizzes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Title</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Classroom</th>
                    <th className="text-left py-2 px-2 font-semibold text-gray-700">Updated</th>
                    <th className="text-right py-2 px-2 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dummyQuizzes.map((quiz) => (
                    <tr key={quiz.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2 text-gray-900">{quiz.title}</td>
                      <td className="py-3 px-2 text-gray-600">{quiz.classroom}</td>
                      <td className="py-3 px-2 text-gray-500">{quiz.updated}</td>
                      <td className="py-3 px-2">
                        <div className="flex justify-end gap-2">
                          <button className="px-3 py-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition">
                            Make Live
                          </button>
                          <button className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded transition">
                            Results
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="md:col-span-3 bg-white rounded-xl shadow-lg p-6 space-y-4 flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold text-gray-900">Create New Quiz</h2>
            <a
              href="/teacher/quizzes/new"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Plus size={24} />
              New Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
