import React from "react";
import { Button as MuiButton } from "@mui/material";

interface Props {
  buttonType: "success" | "delete" | "config" | "frame";
  variant: "contained" | "outlined" | "text";
  children: React.ReactNode;
}

const style = (buttonType: string) => {
  switch (buttonType) {
    case "success":
      return {
        backgroundColor: "#4caf50",
        color: "white",
        "&:hover": {
          backgroundColor: "#388e3c",
        },
      };
    case "delete":
      return {
        backgroundColor: "#f44336",
        color: "white",
        "&:hover": {
          backgroundColor: "#d32f2f",
        },
      };
    case "config":
      return {
        backgroundColor: "#2196f3",
        color: "white",
        "&:hover": {
          backgroundColor: "#1976d2",
        },
      };
    case "frame":
      return {
        backgroundColor: "#ff9800",
        color: "white",
        "&:hover": {
          backgroundColor: "#f57c00",
        },
      };
    default:
      return {};
  }
};
const CustomButton: React.FC<Props> = ({ buttonType, children, variant, ...muiButtonProps }) => {
  return (
    <MuiButton
      variant={variant}
      sx={style(buttonType)}
      {...muiButtonProps}
      style={{ textTransform: "none" }}
      size="small"
    >
      {children}
    </MuiButton>
  );
};

export default CustomButton;
