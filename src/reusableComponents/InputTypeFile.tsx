import React, { ChangeEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import defaultAva from "assets/icon/ava.jpg";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import styled from "styled-components";
import { authThunks } from "features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "app/hooks";

export const InputTypeFile = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.auth.profile);
  const [ava, setAva] = useState(profile ? profile!.avatar : defaultAva);

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64);
          const payload = {
            name: profile ? profile.name : "user",
            avatar: file64,
          };
          dispatch(authThunks.updateProfile({ payload }));
        });
      } else {
        toast.error("Файл слишком большого размера");
      }
    }
  };

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <Avatar alt="Remy Sharp" src={ava || defaultAva} sx={{ width: 124, height: 124 }} />
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: "none" }} />
        <IconButton component="span" aria-label="addAPhotoIcon" style={{ marginTop: "90px", marginLeft: "-30px" }}>
          <AddAPhotoIcon />
        </IconButton>
      </label>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: flex;
`;
