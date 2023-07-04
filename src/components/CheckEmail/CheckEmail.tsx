import React from "react";
import checkIcon from "assets/icon/forgot.jpg";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { useAppSelector } from "app/hooks";

export const CheckEmail = () => {
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.auth.email);

  const backToLogin = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <CheckWrapper>
        <Paper elevation={2} style={{ width: "350px" }}>
          <FormWrapper>
            <h2 style={{ fontFamily: "Montserrat" }}>Check Email</h2>
            <Icon>
              <img src={checkIcon} alt="incubaIcon" />
            </Icon>
            {email && <InstructionSpan>{`We’ve sent an Email with instructions to ${email}`}</InstructionSpan>}

            <TipicalWrapper>
              <ButtonComponent buttonName={"Back to Login"} callback={backToLogin} />
            </TipicalWrapper>
          </FormWrapper>
        </Paper>
      </CheckWrapper>
    </>
  );
};

const Icon = styled.span`
  & > img {
    width: 200px;
  }
`;

const CheckWrapper = styled.span`
  min-height: 430px;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
`;

const FormWrapper = styled.span`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const InstructionSpan = styled.span`
  opacity: 0.5;
  text-align: center;
  margin-top: 10px;
`;

const TipicalWrapper = styled.span`
  margin-top: 40px;

  & > button {
    width: 96%;
  }
`;
