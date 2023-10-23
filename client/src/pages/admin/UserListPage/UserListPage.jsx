import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getUserList, updateUserData } from "../../../core/api/user.api";
import { getUserRoleOptions } from "../../../core/utils/options";
import {
  Container,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useUserAuth } from "../../../context/UserAuthContext";
import { StyledTableCell, StyledTableRow } from "../../../index.styled";
import { NewFooter } from "../../../components/CustomComponents";

const roleOptions = getUserRoleOptions();

export default function UserListPage() {
  const { user: currentUser } = useUserAuth();
  const [userList, setUserList] = useState([]);
  const [disableInput, setDisableInput] = useState(null);

  useEffect(() => {
    // Get all users
    getUserList()
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, uid) => {
    const { value: role } = event.target;
    setDisableInput(uid);
    updateUserData({ uid, role })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setDisableInput(null);
      });
  };

  return (
    <>
    <Container class="w-10/12 m-auto my-10">
      <Typography variant="h4" fontWeight={500} mb={2}>
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>name</StyledTableCell>
              <StyledTableCell>username</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <StyledTableRow key={user.uid}>
                <StyledTableCell component="th" scope="row">
                  {user.uid}
                </StyledTableCell>
                <StyledTableCell>{user.name}</StyledTableCell>
                <StyledTableCell>{user.username}</StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  <FormControl fullWidth>
                    <Select
                      disabled={
                        user.uid === currentUser.uid ||
                        disableInput === user.uid
                      }
                      sx={{ background: "#fff" }}
                      size="small"
                      defaultValue={user.role}
                      label="Age"
                      onChange={(event) => handleChange(event, user.uid)}
                    >
                      {roleOptions.map((option) => (
                        <MenuItem className="capitalize" value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    <NewFooter/>
    </>
  );
}
