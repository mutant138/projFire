async function signup(e) {
  try {
    e.preventDefault();
    const signupDetails = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.pass.value,
    };
    console.log(signupDetails);
    const response = await axios.post("/signup", signupDetails);
    if (response.status >= 200 && response.status < 300) {
      window.location.href = "/login";
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.log(error);
  }
}
