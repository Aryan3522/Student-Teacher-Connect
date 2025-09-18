// import { useState, useEffect, useCallback } from "react";
// import Navbar from "@/components/Navbar.jsx";
// import AssignmentsList from "@/components/AssignmentsList.jsx";
// import TeachersAssignments from "@/components/TeachersAssignments.jsx";
// import Login from "@/components/Login.jsx";
// import Signup from "@/components/Signup.jsx";
// import StudentsPage from "@/components/StudentsPage";
// import axiosInstance from "@/utils/axiosInstance";
// import { toast } from "sonner";

// export default function Home() {
//   const [activePage, setActivePage] = useState("assignments");
//   const [user, setUser] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const [loadingAssignments, setLoadingAssignments] = useState(false);
//   const [fetchError, setFetchError] = useState("");

//   // Fetch assignments memoized function
//   // const fetchAssignments = useCallback(() => {
//   //   if (!user?.token) return;
//   //   setLoadingAssignments(true);
//   //   axiosInstance
//   //     .get("/assignments", {
//   //       headers: { Authorization: `Bearer ${user.token}` },
//   //     })
//   //     .then((res) => {
//   //       setAssignments(res.data);
//   //       setLoadingAssignments(false);
//   //     })
//   //     .catch(() => {
//   //       setFetchError("Failed to load assignments");
//   //       setLoadingAssignments(false);
//   //     });
//   // }, [user?.token]);
//   const fetchAssignments = useCallback(() => {
//   if (!user?.token) return;
//   setLoadingAssignments(true);

//   // Use different API endpoints based on role
//   const url = user.role === 'student' ? '/assignments/my' : '/assignments';

//   axiosInstance
//     .get(url, {
//       headers: { Authorization: `Bearer ${user.token}` },
//     })
//     .then((res) => {
//       setAssignments(res.data);
//       setLoadingAssignments(false);
//     })
//     .catch(() => {
//       setFetchError('Failed to load assignments');
//       setLoadingAssignments(false);
//     });
// }, [user?.token, user?.role]);


//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         setUser({
//           token,
//           username: payload.username,
//           role: payload.role,
//           userId: payload.userId,
//         });
//       } catch {
//         localStorage.removeItem("token");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       fetchAssignments();
//     } else {
//       setAssignments([]);
//     }
//   }, [user, fetchAssignments]);

//   const handleAssignmentPosted = () => {
//     toast.success("Assignment posted successfully!");
//     fetchAssignments();
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//       <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
//         <Navbar
//           user={user}
//           setUser={setUser}
//           activePage={activePage}
//           setActivePage={setActivePage}
//           fetchAssignments={fetchAssignments}
//           onAssignmentPosted={handleAssignmentPosted}
//         />
//       </header>

//       <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
//         {!user && activePage === "login" && (
//           <section className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <Login setUser={setUser} setActivePage={setActivePage} />
//           </section>
//         )}

//         {!user && activePage === "signup" && (
//           <section className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
//             <Signup setActivePage={setActivePage} />
//           </section>
//         )}

//         {user && activePage === "assignments" && (
//           <section>
//             <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
//               All Assignments
//             </h1>
//             <AssignmentsList
//               assignments={assignments}
//               loading={loadingAssignments}
//               error={fetchError}
//             />
//           </section>
//         )}

//         {user && activePage === "teachers" && (
//           <section>
//             <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
//               Assignments by Teachers
//             </h1>
//             <TeachersAssignments assignments={assignments} />
//           </section>
//         )}

//         {user && activePage === "students" && (
//           <section>
//             <StudentsPage assignments={assignments} />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// }
import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar.jsx";
import AssignmentsList from "@/components/AssignmentsList.jsx";
import TeachersAssignments from "@/components/TeachersAssignments.jsx";
import Login from "@/components/Login.jsx";
import Signup from "@/components/Signup.jsx";
import StudentsPage from "@/components/StudentsPage";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "sonner";

export default function Home() {
  const [activePage, setActivePage] = useState("assignments");
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchAssignments = useCallback(() => {
    if (!user?.token) return;
    setLoadingAssignments(true);

    // Always fetch all assignments regardless of user role
    const url = "/assignments";

    axiosInstance
      .get(url, { headers: { Authorization: `Bearer ${user.token}` } })
      .then((res) => {
        setAssignments(res.data);
        setLoadingAssignments(false);
      })
      .catch(() => {
        setFetchError("Failed to load assignments");
        setLoadingAssignments(false);
      });
  }, [user?.token]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          token,
          username: payload.username,
          role: payload.role,
          userId: payload.userId,
        });
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchAssignments();
    } else {
      setAssignments([]);
    }
  }, [user, fetchAssignments]);

  const handleAssignmentPosted = () => {
    toast.success("Assignment posted successfully!");
    fetchAssignments();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
        <Navbar
          user={user}
          setUser={setUser}
          activePage={activePage}
          setActivePage={setActivePage}
          fetchAssignments={fetchAssignments}
          onAssignmentPosted={handleAssignmentPosted}
        />
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {!user && activePage === "login" && (
          <section className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Login setUser={setUser} setActivePage={setActivePage} />
          </section>
        )}

        {!user && activePage === "signup" && (
          <section className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Signup setActivePage={setActivePage} />
          </section>
        )}

        {user && activePage === "assignments" && (
          <section>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
              All Assignments
            </h1>
            <AssignmentsList
              assignments={assignments}
              loading={loadingAssignments}
              error={fetchError}
            />
          </section>
        )}

        {user && activePage === "teachers" && (
          <section>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
              Assignments by Teachers
            </h1>
            <TeachersAssignments assignments={assignments} />
          </section>
        )}

        {user && activePage === "students" && (
          <section>
            <StudentsPage assignments={assignments} />
          </section>
        )}
      </main>
    </div>
  );
}
