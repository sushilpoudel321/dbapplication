import axios from "axios";

const API_URL = "http://localhost:5000"; // Change if your backend runs on a different port

// Function to fetch users from the database
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    return [];
  }
};

// Function to add a new user to the database
export const addUser = async (userData) => {
  try {
    await axios.post(`${API_URL}/users`, userData);
  } catch (error) {
    console.error("Error adding user", error);
  }
};
