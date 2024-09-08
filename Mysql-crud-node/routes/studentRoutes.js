const express = require("express");
const {
  getAllStudentController,
  getStudentByIdController,
  addStudentController,
  updateStudentController,
  deleteStudentController,
} = require("../controllers/studentControllers");
const router = express.Router();

//Get All Student
router.get("/getAll", getAllStudentController);

//Get Student By ID
router.get("/get/:id", getStudentByIdController);

//Create Student
router.post("/create", addStudentController);

//Update Student
router.put("/update/:id", updateStudentController);

//Delete Student
router.delete("/delete/:id", deleteStudentController);

module.exports = router;
