import { TableCell, TableRow, styled, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 700,
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  "& th, & td": {
    color: "#fff",
    border: 0,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "#2D3034",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#222529",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
