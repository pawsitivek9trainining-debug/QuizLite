import { useEffect, useState } from 'react';
import TeacherLogin from './pages/TeacherLogin';
import TeacherRegister from './pages/TeacherRegister';
import TeacherDashboard from './pages/TeacherDashboard';
import QuizBuilder from './pages/QuizBuilder';
import QuizEditor from './pages/QuizEditor';
import MakeQuizLive from './pages/MakeQuizLive';
import StudentJoinClassroom from './pages/StudentJoinClassroom';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderPage = () => {
    if (currentPath === '/teacher/login') return <TeacherLogin />;
    if (currentPath === '/teacher/register') return <TeacherRegister />;
    if (currentPath === '/teacher/dashboard') return <TeacherDashboard />;
    if (currentPath === '/teacher/quizzes/new') return <QuizBuilder />;
    if (currentPath.startsWith('/teacher/quizzes/') && currentPath.endsWith('/edit')) return <QuizEditor />;
    if (currentPath === '/teacher/live') return <MakeQuizLive />;
    if (currentPath === '/student/classroom') return <StudentJoinClassroom />;

    return <HomePage />;
  };

  return renderPage();
}

function HomePage() {
  const handleTeacherLogin = () => {
    window.history.pushState({}, '', '/teacher/login');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleTeacherSignup = () => {
    window.history.pushState({}, '', '/teacher/register');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleStudentJoin = () => {
    window.history.pushState({}, '', '/student/classroom');
    window.dispatchEvent(new PopStateEvent('popstate'));
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
            onClick={handleTeacherSignup}
            className="w-full max-w-sm px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 text-lg font-semibold rounded-lg border-2 border-blue-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Teacher Signup
          </button>

          <div className="w-full max-w-sm flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleStudentJoin}
            className="w-full max-w-sm px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 text-lg font-semibold rounded-lg border-2 border-gray-300 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Student Join
          </button>
        </div>

        <footer className="text-sm text-gray-400 text-center pt-8">
          Made with care
        </footer>
      </div>
    </div>
  );
}

export default App;
