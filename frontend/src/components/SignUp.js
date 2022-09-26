import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {register, reset} from './features/auth/authSlice'
import { Link } from "react-router-dom"; 

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Spinner from "./Spinner";

function SignUp() {
 const [areSamePass, setAreSame] = React.useState(true);
 const navigate = useNavigate()
 const dispatch = useDispatch()

 let isLogged = localStorage.getItem('user')

 React.useEffect(() => { 
  if (isLogged) {
   navigate('/dashboard-layout')
  }
 }, [])

 const [formData, setFormData] = React.useState({
  first_name: "",
  last_name: "",
  email: "",
  password: "e",
  password2: "",
 })

 const { first_name, last_name, password, password2, email } = formData


 const { user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

 React.useEffect(() => {
  if (isError) {
   toast.error(message)
  }

  if (isSuccess) { 
   navigate('/dashboard-layout')
  }
  dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

 const onChange = (e) => { 
  setFormData((prevState) => ({
   ...prevState,
   [e.target.name] : e.target.value,
  }))
 }

 // validating form input
 const handleSubmit = (event) => {
  event.preventDefault();
  if (!first_name || !last_name || !email) {
   toast.error("Please fill all fields")
   return
  }
  if (!email.includes("@") && !email.includes(".")) {
   toast.error("Invalid email")
   return
  }
  if (password !== password2) {
   toast.error("Password do not match")
  } else { 
   const userData = {
    first_name,
    last_name,
    email,
    password
   }
   dispatch(register(userData))
  }
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
    <Form.Group className="mb-3" controlId="formBasicName">
     <Form.Label>First name</Form.Label>
     <Form.Control
      onChange={onChange}
      type="text"
      name="first_name"
      placeholder="First name"
      required
     />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicLName">
     <Form.Label>Last name</Form.Label>
     <Form.Control
      onChange={onChange}
      type="text"
      name="last_name"
      placeholder="Last name"
      required
     />
    </Form.Group>

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
      type="password"
      name="password"
      placeholder="Password"
      required
     />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
     <Form.Label>Confirm Password</Form.Label>
     <Form.Control
      style={areSamePass ? {} : { border: `1px solid red` }}
      onChange={onChange}
      type="password"
      name="password2"
      placeholder="Password"
      required
     />
    </Form.Group>

    <Button type="submit" variant="primary" onClick={handleSubmit}>
     <Link style={{ textDecoration: "none", color: "#fff" }}>Submit</Link>
    </Button>

    <Form.Group className="mt-3" controlId="formBasicConfirmPassword">
     <Link style={{ textDecoration: "none" }} to="/sign-in">
      Sign in
     </Link>
    </Form.Group>
   </Form>
  </Container>
 );
}

export default SignUp;
