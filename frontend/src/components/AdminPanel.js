import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Table from "react-bootstrap/Table";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers, reset, updateUsers, getMe, deleteUsers} from "./features/user/userSlice";
import userService from "./features/user/userService";
import Spinner from "./Spinner";
import authService from "./features/auth/authService";

function AdminPanel() {
 const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
   {props}
  </Tooltip>
 );
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [userS, setUsers] = React.useState([]);
 const [checked, setChecked] = React.useState([]);
 const [allCheck, setAllCheck] = React.useState("");

 const {
  users,
  isLoading,
  isError,
  isSuccess,
  message,
  updateUsersStatus,
  isActive,
 } = useSelector((state) => state.user);

 const areAllChecked = (e) => {
  if (e.target.checked === true) {
   setChecked(
    users.map((user) => {
     document.getElementById(`check-${user._id}`).checked = true;
     return user._id;
    })
   );
  }
  if (e.target.checked === false) {
   users.map((user) => {
    document.getElementById(`check-${user._id}`).checked = false;
   });
   setChecked([]);
  }
 };

 const checkCheked = (e, id) => {
  if (e.target.checked) {
   setChecked([...checked, id]);
  } else {
   let prevIds = [...checked];
   let removeId = prevIds.splice(prevIds.indexOf(id), 1);
   setChecked([...prevIds]);
  }
  if (
   users
    .map((user) => document.getElementById(`check-${user._id}`).checked)
    .every((check) => check === true)
  ) {
   document.getElementById("checkAll").checked = true;
  } else {
   document.getElementById("checkAll").checked = false;
  }
 };

 React.useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  if (isSuccess) {
   setUsers(users);
  }

  if (updateUsersStatus) {
   console.log(updateUsersStatus);
  }

  dispatch(reset());
 }, [
  users,
  isError,
  isSuccess,
  message,
  navigate,
  dispatch,
  updateUsersStatus,
  userS,
  localStorage.getItem("user"),
 ]);

 React.useEffect(() => {
  if (isActive.status !== undefined) {
   if (!isActive.status) {
    authService.logout();
    navigate("/");
   }
  }
 }, [isActive]);


 React.useEffect(() => {
  dispatch(getUsers());
 }, []);

 const updateUserS = async (IDs, status) => {
  if (IDs.length === 0) {
   status
    ? toast.error("Check any user to Unblock")
    : toast.error("Check any user to Block");
  } else {
   dispatch(updateUsers({ IDs, status }));
   dispatch(getUsers());
   dispatch(getMe());
   setChecked([])
  }
 };

 const deleteUserS = async (IDs) => {
  if (IDs.length === 0) {
   toast.error("Check any user to Delete");
  } else {
   dispatch(deleteUsers({ IDs }));
   dispatch(getUsers());
   dispatch(getMe());
  }
 };

 if (isLoading) {
  return <Spinner />;
 }

 return (
  <div style={{ width: "90vw", marginTop: "100px" }} className="mx-auto">
   <h1 className="text-center text-white">Admin panel</h1>
   <div className="d-flex  justify-content-start mb-2">
    <OverlayTrigger
     placement="top"
     delay={{ show: 250, hide: 400 }}
     overlay={renderTooltip("Delete user")}
    >
     <Button
      className="mx-2"
      variant="danger"
      onClick={() => {
       updateUserS(checked, false);
      }}
     >
      Block
     </Button>
    </OverlayTrigger>
    <OverlayTrigger
     placement="top"
     delay={{ show: 250, hide: 400 }}
     overlay={renderTooltip("Unblock user")}
    >
     <Button
      className="d-flex justify-content-center align-items-center mx-2"
      variant="secondary"
      onClick={() => {
       updateUserS(checked, true);
      }}
     >
      <UnBlockIcon />
     </Button>
    </OverlayTrigger>
    <OverlayTrigger
     placement="top"
     delay={{ show: 250, hide: 400 }}
     overlay={renderTooltip("Delete user")}
    >
     <Button
      className="d-flex justify-content-center align-items-center mx-2"
      variant="secondary"
      onClick={() => { deleteUserS(checked)}}
     >
      <DeleteIcon />
     </Button>
    </OverlayTrigger>
   </div>
   <Table striped bordered hover variant="dark">
    <div></div>
    <thead>
     <tr>
      <th className="d-flex justify-content-center">
       <Form.Check onClick={areAllChecked} id="checkAll" />
      </th>
      <th>Id</th>
      <th>E-mail</th>
      <th>Last login date</th>
      <th>Registration date</th>
      <th>Status</th>
     </tr>
    </thead>
    <tbody className="">
     {userS.map((user) => (
      <tr key={user._id}>
       <td className="d-flex justify-content-center">
        {" "}
        <Form.Check
         id={`check-${user._id}`}
         onChange={(e) => {
          checkCheked(e, user._id);
         }}
        />
       </td>
       <td>{user._id}</td>
       <td>{user.email}</td>
       <td>{user.last_login}</td>
       <td>{user.register_date}</td>
       <td className={`text-${user.status ? "success" : "danger"}`}>
        {user.status ? "Active" : "Blocked"}
       </td>
      </tr>
     ))}
    </tbody>
   </Table>
  </div>
 );
}

export default AdminPanel;

const DeleteIcon = () => (
 <svg
  height={20}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="white"
  className="w-6 h-6"
 >
  <path
   strokeLinecap="round"
   strokeLinejoin="round"
   d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />
 </svg>
);

const UnBlockIcon = () => (
 <svg
  height={20}
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="white"
  className="w-6 h-6"
 >
  <path
   strokeLinecap="round"
   strokeLinejoin="round"
   d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
  />
 </svg>
);
