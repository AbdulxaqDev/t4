import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function ResetPassword() {
 // user data states
 const [email, setEmail] = React.useState(null);

 // validating form input
 const handleSubmit = (event) => {
  event.stopPropagation();
  event.preventDefault()
  if (!email) return
  if (!(email.includes('@') && email.includes('.'))) return alert('Enter valid E-mail.')
  console.log({
   email: email,
  });
 };

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
    onSubmit={handleSubmit}
   >

    <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Email address</Form.Label>
     <Form.Control onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Enter email" required />
    </Form.Group>

    <Button type='submit' variant="primary" onClick={handleSubmit}>
     <Link style={{ textDecoration: "none", color: "#fff" }}>
      Send email
     </Link>
    </Button>
   </Form>
  </Container>
 );
}

export default ResetPassword;
