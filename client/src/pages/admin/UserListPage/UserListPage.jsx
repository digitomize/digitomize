import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getUserList, updateUserData } from "../../../core/api/user.api";
import { getUserRoleOptions } from "../../../core/utils/options";
import {
  Container,
  FormControl,
  MenuItem,
  Button,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack
} from "@mui/material";
import { useUserAuth } from "../../../context/UserAuthContext";
import { StyledTableCell, StyledTableRow } from "../../../index.styled";
import { NewFooter } from "../../../components/CustomComponents";
import AppModal from "../../../core/components/AppModal";
import AppDialog from "../../../core/components/AppModal";
import CreateUser from "./CreateUser";

const roleOptions = getUserRoleOptions();

export default function UserListPage() {
  const { user: currentUser } = useUserAuth();
  const [userList, setUserList] = useState([]);
  const [disableInput, setDisableInput] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    <Container class="w-10/12 m-auto my-10 max-phone:mt-24">
      {/* <Typography variant="h4" fontWeight={500} mb={2}>
        Users
        </Typography> */}
        <Stack
        mb={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" fontWeight={500}>
          users
        </Typography>
        <Button onClick={handleOpen}>Create user</Button>
        <AppDialog
          open={open}
          handleClose={handleClose}
          title={"Create User"}
        >
          <CreateUser handleClose={handleClose} />
        </AppDialog>
        </Stack>
        
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
