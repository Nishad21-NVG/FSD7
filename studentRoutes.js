const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Insert Student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Student by Roll No
router.delete('/:rollNo', async (req, res) => {
  try {
    await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Student by Roll No
router.put('/:rollNo', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate({ rollNo: req.params.rollNo }, req.body, { new: true });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
