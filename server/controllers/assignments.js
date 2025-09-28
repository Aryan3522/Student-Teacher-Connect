import Assignment from "../models/Assignment.js";

export const createAssignments = async (req, res) => {
  if (req.user.role !== "teacher") {
    return res.status(403).json({ message: "Forbidden: teachers only" });
  }
  const { title, description, deadline, subject, assignedTo } = req.body;
  try {
    const assignment = new Assignment({
      title,
      description,
      deadline,
      subject,
      createdBy: req.user.userId,
      assignedTo: assignedTo || [],
    });
    await assignment.save();
    res.status(201).json({ message: "Assignment created" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating assignment", error: err.message });
  }
};
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("createdBy", "username role")
      .exec();
    res.json(assignments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching assignments", error: err.message });
  }
};
