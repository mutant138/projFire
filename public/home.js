document.addEventListener("DOMContentLoaded", () => {
  const markAttendanceForm = document.getElementById("markAttendanceForm");
  const viewAllAttendanceBtn = document.getElementById("viewAllAttendanceBtn");
  const viewUserAttendanceBtn = document.getElementById(
    "viewUserAttendanceBtn"
  );
  const viewDateAttendanceBtn = document.getElementById(
    "viewDateAttendanceBtn"
  );
  const viewUserDateAttendanceBtn = document.getElementById(
    "viewUserDateAttendanceBtn"
  );
  const attendanceRecordsDiv = document.getElementById("attendanceRecords");
  const token = localStorage.getItem("token");

  markAttendanceForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const attendanceDetails = {
      name: e.target.name.value,
      date: e.target.date.value,
      status: e.target.status.value,
    };

    try {
      const response = await axios.post("/attendance/mark", attendanceDetails, {
        headers: { Authorization: token },
      });
      if (response.status !== 200) {
        throw new Error("Failed to mark attendance");
      }
      alert("Attendance marked successfully");
      e.target.reset();
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Error marking attendance");
    }
  });

  viewAllAttendanceBtn.addEventListener("click", async () => {
    try {
      const response = await axios.get("/attendance", {
        headers: { Authorization: token },
      });
      displayAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching all attendance records:", error);
      alert("Error fetching all attendance records");
    }
  });

  viewUserAttendanceBtn.addEventListener("click", async () => {
    const studentName = prompt("Student Name");
    if (studentName) {
      try {
        const response = await axios.get(`/attendance/${studentName}`, {
          headers: { Authorization: token },
        });
        displayAttendanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching user attendance records:", error);
        alert("Error fetching user attendance records");
      }
    }
  });

  viewDateAttendanceBtn.addEventListener("click", async () => {
    const date = prompt("Enter date (YYYY-MM-DD):");
    if (date) {
      try {
        const response = await axios.get(`/attendance/date/${date}`, {
          headers: { Authorization: token },
        });
        displayAttendanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance records for date:", error);
        alert("Error fetching attendance records for date");
      }
    }
  });

  viewUserDateAttendanceBtn.addEventListener("click", async () => {
    const name = prompt("Enter Name:");
    const date = prompt("Enter date (YYYY-MM-DD):");
    if (name && date) {
      try {
        const response = await axios.get(`/attendance/${name}/date/${date}`, {
          headers: { Authorization: token },
        });
        displayAttendanceRecords(response.data);
      } catch (error) {
        console.error(
          "Error fetching user attendance records for date:",
          error
        );
        alert("Error fetching user attendance records for date");
      }
    }
  });

  function displayAttendanceRecords(records) {
    let html = "<h3>Attendance Records</h3>";
    if (records.length === 0) {
      html += "<p>No attendance records found.</p>";
    } else {
      html += "<ul>";
      records.forEach((record) => {
        html += `<li>${record.name} - ${record.date} - ${record.status}</li>`;
      });
      html += "</ul>";
    }
    attendanceRecordsDiv.innerHTML = html;
  }
});
