import axios from "axios";

const API_URL = "/api/user/";

// Get  users
const getUsers = async () => {
 let user = JSON.parse(localStorage.getItem("user"));
 const config = {
  headers: { Authorization: `Bearer ${user.token}` },
 };
 let response = await axios.get(API_URL, config);

 if (response.data) {
  localStorage.setItem("users", JSON.stringify(response.data));
 }

 return response.data;
};

// Get  users
const getMe = async () => {
 let user = JSON.parse(localStorage.getItem("user"));
 const config = {
  headers: { Authorization: `Bearer ${user.token}` },
 };
 const me = await axios
  .get(API_URL + "me", config)
  .then((response) => response.data)
  .catch((error) => error.data);
 console.log(me);
 return me
};

// // Delete users
// const deleteUsers = async (IDs) => {
//  const response = await axios.post(API_URL + "login");
//  if (response.data) {
//   localStorage.setItem("user", JSON.stringify(response.data));
//  }
//  return response.data;
// };

// Update users
const updateUsers = async (updateUsersStatus) => {
 const { IDs, status } = updateUsersStatus
 let user = JSON.parse(localStorage.getItem("user"));
 const config = {
  headers: { Authorization: `Bearer ${user.token}` },
 };
 const body = {
  IDs,
  status
};
 let response = await axios.put(API_URL, body, config);

 return response.data;
};

const userService = {
 getUsers,
 getMe,
 // deleteUsers,
 updateUsers
};

export default userService;
