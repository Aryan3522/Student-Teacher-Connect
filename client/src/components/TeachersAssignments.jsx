import { Delete, Edit, Trash } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function TeachersAssignments({ assignments }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const grouped = assignments.reduce((acc, a) => {
    const teacher = a.createdBy?.username || "Unknown";
    if (!acc[teacher]) acc[teacher] = [];
    acc[teacher].push(a);
    return acc;
  }, {});

  // const cardStyle = `max-w-[500px] p-4 bg-warm-beige dark:bg-deep-teal
  //   rounded-lg shadow-md hover:shadow-lg transition-shadow
  //   cursor-pointer flex flex-col justify-between
  // `;
  // const cardStyle = "max-w-[500px] p-4 bg-warm-beige dark:bg-deep-teal rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between";
const cardStyle = " max-w-[500px] min-h-[250px] p-4 bg-warm-beige dark:bg-deep-teal rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between";

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {Object.entries(grouped).map(([teacher, teacherAssignments]) => (
        <section key={teacher} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-dark-bg dark:text-soft-coral">
            Assignments by {teacher}
          </h2>
          <div className="flex flex-col  flex-wrap gap-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            {teacherAssignments.map((a) => (
              <div
                key={a._id}
                className={cardStyle}
                tabIndex={0}
                role="button"
                aria-label={`Assignment ${a.title}`}
              >
                <h3 className="text-xl font-bold mb-2 text-dark-bg dark:text-soft-coral truncate">
                  {a.title}
                </h3>
                <p className="text-sm font-semibold text-deep-teal dark:text-soft-coral mb-1 truncate">
                  Subject: {a.subject}
                </p>
                <p className="text-sm text-sage-green dark:text-warm-beige mb-2">
                  Deadline: {isClient ? new Date(a.deadline).toLocaleDateString() : a.deadline}
                </p>
                <p className="mb-3 text-dark-bg dark:text-warm-beige line-clamp-3">
                  {a.description}
                </p>
                <p className="text-xs italic text-sage-green dark:text-soft-coral mt-auto">
                  Posted by: {teacher}
                </p>
                {/* Conditionally render Edit button */}
                {a.createdBy?.username === localStorage.getItem("username") && (
                  <div className="flex flex-row justify-around">
                    <Edit className="text-blue-500"/>
                    <Trash className="text-red-500"/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
