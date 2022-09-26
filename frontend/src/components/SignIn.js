import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "./features/auth/authSlice";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

function SignIn() {
 const [formData, setFormData] = React.useState({
  email: "",
  password: "",
 });

 const { password, email } = formData;

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { user, isLoading, isError, isSuccess, message } = useSelector(
  (state) => state.auth
 );

 let isLogged = localStorage.getItem('user')

 React.useEffect(() => { 
  if (isLogged) {
   navigate('/dashboard-layout')
  }
 }, [])

 React.useEffect(() => {
  if (isError) {
   toast.error(message);
  }

  if (isSuccess && user) {
   navigate("/dashboard-layout");
  }
  dispatch(reset());
 }, [user, isError, isSuccess, message, navigate, dispatch]);

 const onChange = (e) => {
  setFormData((prevState) => ({
   ...prevState,
   [e.target.name]: e.target.value,
  }));
 };

 // validating form input
 const handleSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();
  
  if (!email || !password) {
   toast.error('Please fill all fields!')
  }
  const userData = {
   email,
   password
  }

  dispatch(login(userData))
 };

 if (isLoading) {
  return <Spinner/>
 }

 return (
  <Container
   style={{ height: "100vh" }}
   className="d-flex justify-content-center align-items-center"
  >
   <Form
    style={{
     borderRadius: "10px",
     backgroundColor: "rgba(255, 255, 255, 0.2)",
     width: "400px",
    }}
    className="p-3 text-white"
    noValidate
    onSubmit={handleSubmit}
   >
    <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email address</Form.Label>
     <Form.Control
      onChange={onChange}
      type="email"
      name="email"
      placeholder="Enter email"
      required
     />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Password</Form.Label>
     <Form.Control
      onChange={onChange}
      name="password"
      type="password"
      placeholder="Password"
      required
     />
    </Form.Group>

    <Button type="submit" variant="primary" onClick={handleSubmit}>
     <Link style={{ textDecoration: "none", color: "#fff" }}>Sign in</Link>
    </Button>

    <Form.Group className="mt-3" controlId="formBasicConfirmPassword">
     <Link style={{ textDecoration: "none" }} to="/">
      Sign up
     </Link>
    </Form.Group>
   </Form>
  </Container>
 );
}

export default SignIn;
