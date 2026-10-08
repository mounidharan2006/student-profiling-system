const express = require("express");
const Student = require("../models/Student");

const router = express.Router();


// CREATE STUDENT
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);

    const savedStudent = await student.save();

    res.status(201).json({
      message: "Student profile created successfully",
      student: savedStudent
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating student",
      error: error.message
    });

  }
});


// GET ALL STUDENTS
router.get("/", async (req, res) => {
  try {

    const students = await Student.find()
      .sort({ createdAt: -1 });

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching students",
      error: error.message
    });

  }
});


// GET ONE STUDENT
router.get("/:id", async (req, res) => {
  try {

    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching student",
      error: error.message
    });

  }
});


// UPDATE STUDENT
router.put("/:id", async (req, res) => {
  try {

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student updated successfully",
      student
    });

  } catch (error) {

    res.status(500).json({
      message: "Error updating student",
      error: error.message
    });

  }
});


// DELETE STUDENT
router.delete("/:id", async (req, res) => {
  try {

    const student = await Student.findByIdAndDelete(
      req.params.id
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error deleting student",
      error: error.message
    });

  }
});


module.exports = router;