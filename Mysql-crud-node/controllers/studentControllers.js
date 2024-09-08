const db = require("../config/dbConn");

const getAllStudentController = async (req, res) => {
  try {
    const allStudent = await db.query("Select * from student");
    if (!allStudent) {
      return res.status(501).send({
        message: "No record found.",
        success: false,
      });
    }
    res.status(200).send({
      totalSudent: allStudent[0].length,
      data: allStudent[0],
      success: true,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in get all student api.",
      success: false,
      error,
    });
  }
};

const getStudentByIdController = async (req, res) => {
  try {
    const studentId = req.params.id;
    const getStudent = await db.query(
      "SELECT * from student where student_id=?",
      [studentId]
    );
    if (!getStudent) {
      return res.status(501).send({
        message: "No record found.",
        success: false,
      });
    }
    res.status(200).send({
      data: getStudent[0],
      success: true,
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in get student api.",
      success: false,
      error,
    });
  }
};

const addStudentController = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      age,
      email,
      country,
      postal_code,
      major,
      gpa,
      generation,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !age ||
      !email ||
      !country ||
      !postal_code ||
      !major ||
      !gpa ||
      !generation
    ) {
      return res.status(501).send({
        message: "Please provide all details.",
        success: false,
      });
    }
    const [insertData] = await db.query(
      `INSERT into student (first_name, last_name, age, email, country, postal_code, major, gpa, generation) VALUES (? , ?, ?, ? , ?, ?, ? , ?, ?)`,
      [
        first_name,
        last_name,
        age,
        email,
        country,
        postal_code,
        major,
        gpa,
        generation,
      ]
    );
    if (!insertData) {
      return res.status(501).send({
        message: "Error in insert Query.",
        success: false,
      });
    }

    const student_id = insertData.insertId;

    const [studentData] = await db.query(
      `SELECT * FROM student WHERE student_id = ?`,
      [student_id]
    );

    res.status(201).send({
      data: studentData,
      message: "Student added Successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in add student api.",
      success: false,
      error,
    });
  }
};

const updateStudentController = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(502).send({
        success: false,
        message: "Invalid ID or Provide ID.",
      });
    }
    const { first_name, last_name, age, country, postal_code } = req.body;
    const [studentData] = await db.query(
      "UPDATE student SET first_name = ?, last_name = ?, age = ?, country = ?, postal_code = ? WHERE student_id = ?",
      [first_name, last_name, age, country, postal_code, studentId]
    );
    if (!studentData) {
      return res.status(502).send({
        success: false,
        message: "Error in Update Query.",
      });
    }

    const [updatedData] = await db.query(
      `SELECT * FROM student WHERE student_id = ?`,
      [studentId]
    );
    res.status(201).send({
      data: updatedData,
      success: true,
      message: "Student details Updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in update student api.",
      success: false,
      error,
    });
  }
};

const deleteStudentController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(502).send({
        success: false,
        message: "Invalid ID or Provide ID.",
      });
    }
    const deleteStudent = await db.query(
      "DELETE from student WHERE student_id = ?",
      [id]
    );
    if (!deleteStudent) {
      return res.status(502).send({
        success: false,
        message: "Error in delete query.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Student data deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in delete student api.",
      success: false,
      error,
    });
  }
};
module.exports = {
  getAllStudentController,
  getStudentByIdController,
  addStudentController,
  updateStudentController,
  deleteStudentController,
};
