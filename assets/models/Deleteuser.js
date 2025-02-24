import axios from "axios";
const deleteUserAccount = async (userId) => {
  try {
    const response = await axios.post("http://192.168.8.101:5000/delete-user", {
      userId: userId,
    });

    if (response.data.success) {
      console.log("User deleted successfully");
    } else {
      console.error("Error deleting user:", response.data.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

export default deleteUserAccount;
