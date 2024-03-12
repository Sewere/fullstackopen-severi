import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const login = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, { username, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export default { login };
