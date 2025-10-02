function App() {
  const handleTeacherLogin = () => {
    window.location.href = '/teacher/login';
  };

  const handleStudentJoin = () => {
    window.location.href = '/student/classroom';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full py-16 space-y-10">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            QuizLite
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Create, run, and review classroom quizzes.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleTeacherLogin}
            className="w-full max-w-sm px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Teacher Login
          </button>

          <button
            onClick={handleStudentJoin}
            className="w-full max-w-sm px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-semibold rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Student Join
          </button>
        </div>

        <footer className="text-sm text-gray-400 text-center pt-8">
          Made with ❤️
        </footer>
      </div>
    </div>
  );
}

export default App;
