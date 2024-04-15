import React from "react";
import { Modal, Backdrop, Fade, Button } from "@mui/material";

const CustomModal = ({ open, onClose, children }) => {
  return (
    <Modal
      closeAfterTransition
      open={open}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open}>
        <div style={{ backgroundColor: "white", padding: "20px" }}>
          {children}
          <Button onClick={onClose}>Close</Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
