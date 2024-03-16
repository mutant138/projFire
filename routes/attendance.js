const express = require('express')
const Attendance = require("../models/attendance")
const attendanceController = require("../controllers/attendance")
const authentication = require("../middleware/auth")



const router = express.Router()

router.post("/mark" ,authentication.authentication,attendanceController.attendanceMark)
router.get("/", authentication.authentication , attendanceController.getAllAttendance)
router.get("/:studentName", authentication.authentication, attendanceController.getAttendanceByName);
router.get("/date/:date", authentication.authentication, attendanceController.getAttendanceByDate);
router.get("/:name/date/:date", authentication.authentication, attendanceController.getAttendanceByNameAndDate);




module.exports = router