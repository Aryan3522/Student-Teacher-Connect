import React from "react";
import AssignmentsList from "./AssignmentsList.jsx";

export default function StudentsPage({ assignments }) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6 text-dark-bg dark:text-soft-coral">
        Your Assignments
      </h1>

      {assignments.length === 0 ? (
        <p className="text-deep-teal dark:text-soft-coral">No assignments assigned to you yet.</p>
      ) : (
        <AssignmentsList assignments={assignments} />
      )}
    </div>
  );
}
