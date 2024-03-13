import axios from "axios";
const baseUrl = "/api/users";


const getUsers = async () => {
  try {
    console.log("GEtting data")
    const response = await axios.get(baseUrl);
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401 || error.response.status === 400) {
      console.warn("Invalid username or password.");
    } else {
      console.error("Error during login:", error);
    }
  }
}

export default { getUsers };
