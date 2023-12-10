import * as React from "react"
import DialogTitle from "@mui/material/DialogTitle"
import { StyledDialog } from "./AppDialog.Styled"

export default function AppDialog({ open, title, children, handleClose }) {
  return (
    <StyledDialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ background: "#000" }}>{title}</DialogTitle>
      {children}
    </StyledDialog>
  )
}
