const firebase = require("../database");
const AttendanceCollection = firebase.collection("Attendance");

const addAttendance = async (attendanceData) => {
  try {
    const docRef = await AttendanceCollection.add(attendanceData);
    return docRef.id; //Id of new attendance
  } catch (error) {
    console.error("Error adding attendance:", error);
    throw new Error("Failed to add attendance record");
  }
};
const getAllAttendance = async () => {
  try {
    const snapshot = await AttendanceCollection.get();
    const attendanceRecords = [];
    snapshot.forEach((doc) => {
      attendanceRecords.push({ id: doc.id, ...doc.data() });
    });
    return attendanceRecords;
  } catch (error) {
    console.error("Error getting all attendance records:", error);
    throw new Error("Failed to get attendance records");
  }
};

const getAttendanceByStudentName = async (studentName) => {
  try {
    const snapshot = await AttendanceCollection.where(
      "name",
      "==",
      studentName
    ).get();
    const attendanceRecords = [];
    snapshot.forEach((doc) => {
      attendanceRecords.push({ id: doc.id, ...doc.data() });
    });
    return attendanceRecords;
  } catch (error) {
    console.error("Error getting attendance records by student name:", error);
    throw new Error("Failed to get attendance records by student name");
  }
};

const getAttendanceByDate = async (date) => {
  try {
    const snapshot = await AttendanceCollection.where("date", "==", date).get();
    const attendanceRecords = [];
    snapshot.forEach((doc) => {
      attendanceRecords.push({ id: doc.id, ...doc.data() });
    });
    return attendanceRecords;
  } catch (error) {
    console.error("Error getting attendance records by student name:", error);
    throw new Error("Failed to get attendance records by student name");
  }
};

const getAttendanceByNameAndDate = async (studentName, date) => {
  try {
    const snapshot = await AttendanceCollection.where("name", "==", studentName)
      .where("date", "==", date)
      .get();
    const attendanceRecords = [];
    snapshot.forEach((doc) => {
      attendanceRecords.push({ id: doc.id, ...doc.data() });
    });
    return attendanceRecords;
  } catch (error) {
    console.error(
      "Error getting attendance records by student name and date:",
      error
    );
    throw new Error(
      "Failed to get attendance records by student name and date"
    );
  }
};

// Exporting
module.exports = {
  addAttendance,
  getAllAttendance,
  getAttendanceByStudentName,
  getAttendanceByDate,
  getAttendanceByNameAndDate,
};
