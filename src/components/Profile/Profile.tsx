import React, { KeyboardEvent, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { authThunks } from "features/auth/auth.slice";
import panIcon from "assets/icon/pan.jpg";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ButtonComponent, InputTypeFile } from "reusableComponents";

export const Profile = () => {
  const profile = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const textRef = useRef<HTMLInputElement>(null);

  const logOuthandler = () => {
    dispatch(authThunks.logout());
  };

  const updateHandler = (textRef: string) => {
    const payload = {
      name: textRef,
      //avatar?: string;
    };
    dispatch(authThunks.updateProfile({ payload }));
  };

  const editHandler = () => {
    setEdit(!edit);
    if (textRef.current) {
      updateHandler(textRef.current.value);
    }
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      editHandler();
    }
  };

  return (
    <Wrapper>
      <Paper elevation={2} style={{ width: "350px" }}>
        <FormWrapper>
          <h2 style={{ fontFamily: "Montserrat" }}>Personal Information</h2>
          <AvatarWrapper>
            <InputTypeFile />
          </AvatarWrapper>
          <NameWrapper>
            {edit ? (
              <TextField
                placeholder={profile ? profile.name : "user"}
                inputRef={textRef}
                variant="standard"
                onKeyPress={onKeyPressHandler}
              />
            ) : (
              <NameSpan>{profile ? profile.name : "user"} </NameSpan>
            )}
            <Icon onClick={editHandler}>
              <img src={panIcon} alt="panIcon" />
            </Icon>
          </NameWrapper>
          <div>
            <OpacitySpan>{profile ? profile.email : "email"}</OpacitySpan>
          </div>

          <TipicalWrapper>
            <ButtonComponent buttonName={"Log out"} callback={logOuthandler} disabled={false} />
          </TipicalWrapper>
        </FormWrapper>
      </Paper>
    </Wrapper>
  );
};

const NameSpan = styled.span`
  font-size: 20px;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;
`;

const AvatarWrapper = styled.span`
  display: flex;
  justify-content: center;
`;

const Icon = styled.span`
  margin-left: 5px;
  margin-top: 4px;
  cursor: pointer;

  & > img {
    width: 20px;
  }
`;

const OpacitySpan = styled.span`
  opacity: 0.5;
  text-align: left;
  margin-left: 10px;
`;

const TipicalWrapper = styled.div`
  margin-top: 40px;

  & > button {
    width: 96%;
  }
`;

const Wrapper = styled.span`
  margin-top: 50px;
  min-height: 400px;
  display: flex;
  justify-content: space-around;
`;

const FormWrapper = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 310px;
`;
