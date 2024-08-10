import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserList, updateUserData } from "@core/api/user.api";
import { getUserRoleOptions } from "@core/utils/options";
import { deepOrange } from "@mui/material/colors";
import {
  Avatar,
  Container,
  FormControl,
  MenuItem,
  Box,
  Button,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LaunchIcon from "@mui/icons-material/Launch";
import { useUserAuth } from "@context/UserAuthContext";
import { StyledTableCell, StyledTableRow } from "../../../index.styled";
import { Footer } from "@components/CustomComponents";
import AppDialog from "@core/components/AppModal";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import { uniqueToast } from "../../../core/utils/unique-toast";

function formatCreatedAt(createdAtString) {
  const createdAt = new Date(createdAtString);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Use 24-hour format
  };

  return createdAt.toLocaleDateString("en-US", options);
}

const roleOptions = getUserRoleOptions();

export default function UserListPage() {
  const { user: currentUser } = useUserAuth();
  const [userList, setUserList] = useState([]);
  const [disableInput, setDisableInput] = useState(null);
  const [selectedUser, setselectedUser] = useState(null);
  const toastId = uniqueToast();

  let key;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDel, setOpenDel] = useState(false);
  // const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);

  const handleOpenDel = (user) => {
    setselectedUser(user);
    // console.log("SELECTED:", selectedUser);
    // console.log(`Deleting user: ${user}`);
    setOpenDel(true);
  };

  useEffect(() => {
    // Get all users
    getUserList()
      .then((response) => {
        setUserList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event, uid) => {
    const { value: role } = event.target;
    setDisableInput(uid);
    updateUserData({ uid, role })
      .then((response) => {
        toast.success(response.data.message,{
          toastId
        });
      })
      .catch((error) => {
        toast.error(error.response.data.error,{
          toastId
        });
      })
      .finally(() => {
        setDisableInput(null);
      });
  };

  return (
    <>
      {/* Dialogs */}
      <AppDialog open={open} handleClose={handleClose} title={"Create User"}>
        <CreateUser handleClose={handleClose} />
      </AppDialog>
      <AppDialog
        open={openDel}
        handleClose={handleCloseDel}
        title={"Delete User"}
      >
        <DeleteUser user={selectedUser} handleClose={handleCloseDel} />
      </AppDialog>

      <Container class="w-10/12 m-auto my-10 max-phone:mt-24">
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
        </Stack>

        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, overflowWrap: "anywhere" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Photo</StyledTableCell>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>name</StyledTableCell>
                <StyledTableCell>username</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => (
                <>
                  {/* {console.log(user)} */}
                  <StyledTableRow key={user.uid}>
                    <StyledTableCell>
                      <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt={user.name}
                        src={user.picture}
                      />
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Stack direction={"column"} columnGap={2}>
                        <p className="text-xs">{user.uid}</p>
                        <p className="text-xs">
                          created: {formatCreatedAt(user.createdAt)}
                        </p>
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>
                      <Link to={"/u/" + user.username} target="_blank">
                        <LaunchIcon />
                        {user.username}
                      </Link>
                    </StyledTableCell>
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
                            <MenuItem
                            key={option.value}
                              className="capitalize"
                              value={option.value}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction={"row"} columnGap={2}>
                        <Box
                          sx={{
                            cursor:
                              user.uid === currentUser.uid ||
                              disableInput === user.uid
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          <DeleteForeverIcon
                            onClick={() => {
                              if (
                                !(
                                  user.uid === currentUser.uid ||
                                  disableInput === user.uid
                                )
                              ) {
                                handleOpenDel(user);
                              }
                            }}
                            title="delete user"
                            style={{
                              opacity:
                                user.uid === currentUser.uid ||
                                disableInput === user.uid
                                  ? 0.5
                                  : 1,
                              pointerEvents:
                                user.uid === currentUser.uid ||
                                disableInput === user.uid
                                  ? "none"
                                  : "auto",
                            }}
                          />
                        </Box>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      {/* <Footer /> */}
    </>
  );
}
