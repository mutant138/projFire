const express = require("express");
const cors = require("cors");

//Modals
const Attendance = require("./models/attendance");


//Routes
const userRoutes = require("./routes/user")
const attendanceRoutes  = require("./routes/attendance")


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use(userRoutes)
app.use("/attendance",attendanceRoutes)

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
