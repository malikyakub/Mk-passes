import axios from "axios";

// Define a type for the return value
const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.post("http://192.168.8.102:5000/delete-user", {
      userId: userId,
    });

    if (response.data.success) {
      return { data: response.data, error: null };
    } else {
      return {
        data: null,
        error: response.data.error || "Unknown error occurred",
      };
    }
  } catch (error) {
    return { data: null, error: error.message || "Network error" };
  }
};

export default deleteUserAccount;
