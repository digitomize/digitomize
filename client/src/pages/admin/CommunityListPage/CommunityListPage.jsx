import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCommunityList } from "../../../core/api/community.api";
import { StyledTableCell, StyledTableRow } from "../../../index.styled";
import AppModal from "../../../core/components/AppModal";
import AppDialog from "../../../core/components/AppModal";
import CreateCommunity from "./CreateCommunity";
import { Edit, Group } from "@mui/icons-material";

export default function CommunityListPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [communityList, setCommunityList] = useState([]);
  useEffect(() => {
    // Get Community List
    getCommunityList()
      .then((response) => {
        setCommunityList(response.data.communityList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
    <Container class="w-10/12 m-auto mt-10">
      <Stack
        mb={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" fontWeight={500}>
          Community
        </Typography>
        <Button onClick={handleOpen}>Create Community</Button>
        <AppDialog
          open={open}
          handleClose={handleClose}
          title={"Create Community"}
        >
          <CreateCommunity handleClose={handleClose} />
        </AppDialog>
      </Stack>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, background: "#000" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>vanity</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {communityList.map((community) => (
              <StyledTableRow key={community._id}>
                <StyledTableCell component="th" scope="row" width={"70px"}>
                  {community._id}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {community.name}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {community.vanity}
                </StyledTableCell>
                <StyledTableCell>{community.description}</StyledTableCell>
                <StyledTableCell>
                  <Stack direction={"row"} columnGap={2}>
                    <Box sx={{ cursor: "pointer" }}>
                      <Group title="View Members" />
                    </Box>
                    <Box sx={{ cursor: "pointer" }}>
                      <Edit title="Edit" />
                    </Box>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
      </>
  );
}
