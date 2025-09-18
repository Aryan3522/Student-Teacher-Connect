import React, { useState, useEffect } from 'react';

function AssignmentDetailsModal({ assignment, isOpen, onClose }) {
  if (!isOpen || !assignment) return null;

  return (
    <div
      className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="assignment-details-title"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl max-h-[80vh] w-auto h-auto overflow-auto p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner content click
      >
        <h2 id="assignment-details-title" className="text-2xl font-bold mb-4">
          {assignment.title}
        </h2>
        <p className="mb-2 font-semibold text-indigo-700">Subject: {assignment.subject}</p>
        <p className="mb-2 text-gray-600 dark:text-gray-300">
          Deadline: {new Date(assignment.deadline).toLocaleDateString()}
        </p>
        <p className="mb-4 whitespace-pre-line text-gray-800 dark:text-gray-200">
          {assignment.description}
        </p>
        <p className="italic text-sm text-gray-500 mb-6">
          Posted by: {assignment.createdBy?.username || "Unknown"}
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring"
        >
          Close
        </button>
      </div>
    </div>
  );
}



function AssignmentsList({ assignments }) {
  const [isClient, setIsClient] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!assignments || assignments.length === 0) {
    return <p>No assignments available.</p>;
  }

  // Fixed card size styles
  const cardStyle = "max-w-xs min-h-[260px] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between";

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {assignments.map((a) => (
          <div
            key={a._id}
            className={cardStyle}
            tabIndex={0}
            role="button"
            aria-label={`Assignment ${a.title}`}
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{a.title}</h2>
              <p className="text-sm font-semibold text-indigo-700 mb-1">Subject: {a.subject}</p>
              <p className="text-sm text-gray-600 mb-2">
                Deadline: {isClient ? new Date(a.deadline).toLocaleDateString() : a.deadline}
              </p>
              <p className="mb-3 text-gray-800 dark:text-gray-200 max-h-[70px] overflow-hidden">
                {a.description}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs italic text-gray-500">
                Posted by: {a.createdBy?.username || 'Unknown'}
              </p>
              <button
                onClick={() => {
                  setSelectedAssignment(a);
                  setModalOpen(true);
                }}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm focus:outline-none"
                type="button"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <AssignmentDetailsModal
        assignment={selectedAssignment}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default AssignmentsList;
