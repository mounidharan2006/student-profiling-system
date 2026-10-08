const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    registerNumber: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true
    },

    phone: String,

    dateOfBirth: String,

    gender: String,

    address: String,

    fatherName: String,

    motherName: String,

    familyIncome: Number,

    fatherOccupation: String,

    motherOccupation: String,

    semester: Number,

    cgpa: Number,

    semesterPerformance: [
      {
        semester: Number,
        sgpa: Number
      }
    ],

    arrears: [
      {
        subject: String,
        semester: Number,
        status: String
      }
    ],

    technicalSkills: [String],

    strengths: String,

    weaknesses: String,

    careerGoal: String,

    careerPath: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);