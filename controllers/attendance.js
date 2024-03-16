const express = require("express");
//const jwt = require("jsonwebtoken");
//const db = require("../database");
const Attendance = require("../models/attendance");

const attendanceMark = async (req, res) => {
  try {
    const { name, date, status } = req.body;
    await Attendance.addAttendance({ name, date, status });
    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.getAllAttendance();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAttendanceByName = async (req, res) => {
  try {
    const studentName = req.params.studentName; // getting the name from params
    const attendanceRecords = await Attendance.getAttendanceByStudentName(  studentName ); //passing it to the magic function
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAttendanceByDate = async (req, res) => {
  try {
    const date = req.params.date; //getting the date from params
    const attendanceRecords = await Attendance.getAttendanceByDate(date); // passing it to the magic function
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getAttendanceByNameAndDate = async (req, res) => {
  try {
    const studentName = req.params.name;
    const date = req.params.date;
    const attendanceRecords = await Attendance.getAttendanceByNameAndDate(
      studentName,
      date
    );
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  attendanceMark,
  getAllAttendance,
  getAttendanceByName,
  getAttendanceByDate,
  getAttendanceByNameAndDate,
};
