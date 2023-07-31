import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import xIcon from "assets/icon/x.png";
import { S } from "reusableForms/Form_styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
};

export const BasicModal: React.FC<PropsWithChildren & PropsType> = ({ children, open, setOpen, title }) => {
  //const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/*<Button onClick={handleOpen}>Open modal</Button>*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
    </div>
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
