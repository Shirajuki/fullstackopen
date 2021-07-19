import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const Users = ({ users }) => {
  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell></TableCell>
            <TableCell>Blogs created</TableCell>
          </TableHead>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Users;
