async function login(e) {
  try {
    e.preventDefault();

    const loginDetails = {
      email: e.target.email.value,
      password: e.target.pass.value,
      role: e.target.role.value,
    };
    console.log(loginDetails);
    const response = await axios.post("/login", loginDetails);
    alert(response.data.message);
    localStorage.setItem("token", response.data.token);
    window.location.href = "/home";
  } catch (error) {
    console.log(error);
  }
}
