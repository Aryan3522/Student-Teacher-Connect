import React, { useState } from 'react';
import PostAssignmentModal from './PostAssignmentModal.jsx';
import { Menu } from 'lucide-react'; // Using lucide-react icons, you can install via npm or replace with another hamburger icon

export default function Navbar({ user, setUser, activePage, setActivePage, fetchAssignments, onAssignmentPosted }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setActivePage('assignments'); // Redirect to default page
    localStorage.removeItem('token');
    setMenuOpen(false);
  };

  const navButtonClass = (page) => {
    return activePage === page
      ? 'bg-blue-600 text-white border border-blue-600'
      : 'text-blue-600 border border-blue-600 hover:bg-blue-50';
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 border-b bg-white dark:bg-gray-800 shadow-sm">
        <div
          className="text-2xl font-bold text-blue-600 cursor-pointer select-none"
          onClick={() => {
            setActivePage('assignments');
            setMenuOpen(false);
          }}
        >
          StuTeach
        </div>

        {/* Hamburger & menu for small screens */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring"
            type="button"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex gap-4 items-center">
          {!user ? (
            <>
              <button
                onClick={() => setActivePage('login')}
                className={`${navButtonClass('login')} font-semibold px-4 py-1 rounded-md`}
                type="button"
              >
                Login
              </button>
              <button
                onClick={() => setActivePage('signup')}
                className={`${navButtonClass('signup')} font-semibold px-4 py-1 rounded-md`}
                type="button"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              {user.role === 'teacher' && (
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
                  type="button"
                >
                  Post Assignment
                </button>
              )}

              {['assignments', 'teachers', 'students'].map((page) => (
                <button
                  key={page}
                  className={`${navButtonClass(page)} font-semibold px-4 py-1 rounded-md focus:outline-none focus:ring`}
                  onClick={() => setActivePage(page)}
                  type="button"
                >
                  {page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="ml-6 text-red-600 border border-red-600 font-semibold px-4 py-1 rounded-md hover:bg-red-100 focus:outline-none focus:ring"
                type="button"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col px-4 py-2 gap-2">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setActivePage('login');
                    setMenuOpen(false);
                  }}
                  className={`${navButtonClass('login')} font-semibold px-4 py-2 rounded-md w-full text-left`}
                  type="button"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setActivePage('signup');
                    setMenuOpen(false);
                  }}
                  className={`${navButtonClass('signup')} font-semibold px-4 py-2 rounded-md w-full text-left`}
                  type="button"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                {user.role === 'teacher' && (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md w-full text-left hover:bg-blue-700 focus:outline-none focus:ring"
                    type="button"
                  >
                    Post Assignment
                  </button>
                )}
                {['assignments', 'teachers', 'students'].map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setActivePage(page);
                      setMenuOpen(false);
                    }}
                    className={`${navButtonClass(page)} font-semibold px-4 py-2 rounded-md w-full text-left focus:outline-none focus:ring`}
                    type="button"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="text-red-600 border border-red-600 font-semibold px-4 py-2 rounded-md w-full text-left hover:bg-red-100 focus:outline-none focus:ring"
                  type="button"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <PostAssignmentModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        teacherToken={user?.token}
        onAssignmentPosted={onAssignmentPosted}
      />
    </>
  );
}
