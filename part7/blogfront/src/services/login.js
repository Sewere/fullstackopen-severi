import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401 || error.response.status === 400) {
      console.warn("Invalid username or password.");
    } else {
      console.error("Error during login:", error);
    }
  }
};

export default { login };
