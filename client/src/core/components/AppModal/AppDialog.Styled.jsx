import { Box, Dialog, Modal, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    // boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.5)",
  },

  "& .MuiDialogTitle-root": {
    background: "#000",
  },
}));
