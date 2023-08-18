import * as React from "react";
import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import xIcon from "assets/icon/x.png";

const style = {
  maxHeight: "600px", // Установит фиксированную высоту для скролла
  overflowX: "hidden",
  overflowY: "scroll",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
};

export const BasicModal: React.FC<PropsWithChildren & PropsType> = ({ children, open, setOpen, title }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} style={{ overflow: "scroll" }}>
        <TitleWrapper>
          <h2 style={{ fontFamily: "Montserrat" }}>{title}</h2>
          <Icon>
            <img src={xIcon} alt="xIcon" onClick={handleClose} />
          </Icon>
        </TitleWrapper>
        <hr />
        <div style={{ marginLeft: "-15px" }}>{children}</div>
      </Box>
    </Modal>
  );
};

const Icon = styled.span`
  & > img {
    margin-top: 26px;
    cursor: pointer;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -25px;
`;
