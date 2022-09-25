import * as React from "react";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function Users() {
 const users = {
  user1_status: true, 
  user2_status: false, 
 }
 return (
   <div style={{ width: '90vw', marginTop: "100px" }}  className="mx-auto">
  <Table striped bordered hover variant="dark">
    <div>
    </div>
     <thead >
       <tr>
         <th>Id</th>
         <th>E-mail</th>
         <th>Last login date</th>
         <th>Registration date</th>
         <th>Status</th>
       </tr>
     </thead>
     <tbody className="" >
       <tr>
         <td>1</td>
         <td>Abdulkhak@gmail.com</td>
         <td>25-25-2356</td>
         <td>25-25-2356</td>
      <td className={`text-${users.user1_status? "success" : "danger"}`} >{ users.user1_status? "Active" : "Blocked"}</td>
     </tr>
     <tr>
         <td>1</td>
         <td>Abdulkhak@gmail.com</td>
         <td>25-25-2356</td>
         <td>25-25-2356</td>
         <td className={`text-${users.user2_status? "success" : "danger"}`}>{ users.user2_status? "Active" : "Blocked"}</td>
     </tr>
     </tbody>
   </Table>
   </div>
 );
}

export default Users;



const DeleteIcon = () => (
 <svg height={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
)

const UnBlockIcon = () => (
 <svg height={20} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>
)



