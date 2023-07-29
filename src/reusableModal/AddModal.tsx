import React from "react";
import { BasicModal } from "reusableModal";

type PropsType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const AddModal: React.FC<PropsType> = ({ open, setOpen }) => {
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <div>Modal</div>
    </BasicModal>
  );
};
