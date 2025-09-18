// import express from 'express';
// import Assignment from '../models/Assignment.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

// // Authentication middleware
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // POST create assignment (only teachers)
// router.post('/', authMiddleware, async (req, res) => {
//   if (req.user.role !== 'teacher') {
//     return res.status(403).json({ message: 'Forbidden: teachers only' });
//   }
//   const { title, description, deadline, subject } = req.body;
//   try {
//     const assignment = new Assignment({
//       title,
//       description,
//       deadline,
//       subject,
//       createdBy: req.user.userId,
//     });
//     await assignment.save();
//     res.status(201).json({ message: 'Assignment created' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating assignment', error: err.message });
//   }
// });

// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     let assignments;
//     if (req.user.role === 'student') {
//       // Fetch assignments assigned to this student
//       assignments = await Assignment.find({ assignedTo: req.user.userId })
//         .populate('createdBy', 'username role')
//         .exec();
//     } else {
//       // For teachers/admins, fetch all assignments
//       assignments = await Assignment.find()
//         .populate('createdBy', 'username role')
//         .exec();
//     }
//     res.json(assignments);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching assignments', error: err.message });
//   }
// });



// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     let assignments;
//     if (req.user.role === 'student') {
//       const studentObjectId = new mongoose.Types.ObjectId(req.user.userId);  // Convert string to ObjectId
//       assignments = await Assignment.find({ assignedTo: studentObjectId })
//         .populate('createdBy', 'username role')
//         .exec();
//     } else {
//       assignments = await Assignment.find()
//         .populate('createdBy', 'username role')
//         .exec();
//     }
//     res.json(assignments);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching assignments', error: err.message });
//   }
// });

// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     // Fetch all assignments for everyone
//     const assignments = await Assignment.find()
//       .populate('createdBy', 'username role')
//       .exec();
//     res.json(assignments);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching assignments', error: err.message });
//   }
// });



// export default router;
import express from 'express';
import mongoose from 'mongoose';
import Assignment from '../models/Assignment.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// POST create assignment (teachers only)
router.post('/', authMiddleware, async (req, res) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Forbidden: teachers only' });
  }
  const { title, description, deadline, subject, assignedTo } = req.body;
  try {
    const assignment = new Assignment({
      title,
      description,
      deadline,
      subject,
      createdBy: req.user.userId,
      assignedTo: assignedTo || [], // Optional array of student IDs
    });
    await assignment.save();
    res.status(201).json({ message: 'Assignment created' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating assignment', error: err.message });
  }
});

// GET all assignments (for all users)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate('createdBy', 'username role')
      .exec();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assignments', error: err.message });
  }
});

export default router;
