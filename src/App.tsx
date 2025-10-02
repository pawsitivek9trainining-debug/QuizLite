import { useEffect, useState, lazy, Suspense } from 'react';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

const TeacherLogin = lazy(() => import('./pages/TeacherLogin'));
const TeacherRegister = lazy(() => import('./pages/TeacherRegister'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const QuizBuilder = lazy(() => import('./pages/QuizBuilder'));
const QuizEditor = lazy(() => import('./pages/QuizEditor'));
const MakeQuizLive = lazy(() => import('./pages/MakeQuizLive'));
const StudentJoinClassroom = lazy(() => import('./pages/StudentJoinClassroom'));
const StudentDetails = lazy(() => import('./pages/StudentDetails'));
const StudentQuiz = lazy(() => import('./pages/StudentQuiz'));
const StudentDone = lazy(() => import('./pages/StudentDone'));
const TeacherResults = lazy(() => import('./pages/TeacherResults'));
const StudentLogin = lazy(() => import('./pages/StudentLogin'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
    if (currentPath === '/') return <HomePage />;

    return (
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center"><div className="text-lg text-gray-600">Loading...</div></div>}>
        {currentPath === '/teacher/login' && <TeacherLogin />}
        {currentPath === '/teacher/register' && <TeacherRegister />}
        {currentPath === '/teacher/dashboard' && <TeacherDashboard />}
        {currentPath === '/teacher/quizzes/new' && <QuizBuilder />}
        {currentPath.startsWith('/teacher/quizzes/') && currentPath.endsWith('/edit') && <QuizEditor />}
        {currentPath === '/teacher/live' && <MakeQuizLive />}
        {currentPath.startsWith('/teacher/results/') && <TeacherResults />}
        {currentPath === '/student/login' && <StudentLogin />}
        {currentPath === '/student/classroom' && <StudentJoinClassroom />}
        {currentPath === '/student/details' && <StudentDetails />}
        {currentPath.startsWith('/student/quiz/') && <StudentQuiz />}
        {currentPath === '/student/done' && <StudentDone />}
        {!['/', '/teacher/login', '/teacher/register', '/teacher/dashboard', '/teacher/quizzes/new', '/teacher/live', '/student/login', '/student/classroom', '/student/details', '/student/done'].includes(currentPath) &&
         !currentPath.startsWith('/teacher/quizzes/') &&
         !currentPath.startsWith('/teacher/results/') &&
         !currentPath.startsWith('/student/quiz/') && <NotFound />}
      </Suspense>
    );
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
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-28 h-28 bg-blue-600 rounded-3xl flex items-center justify-center transform rotate-3 shadow-xl">
                <BookOpen className="w-14 h-14 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-center text-gray-900">
              QuizLite
            </h1>
            <p className="text-lg text-gray-600 text-center">
              Create, run, and review classroom quizzes.
            </p>
          </div>
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
