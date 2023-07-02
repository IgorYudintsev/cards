import React, { useEffect, useState } from "react";
import incubaIcon from "assets/icon/incubaIcon.jpg";
import styled from "styled-components";
import { ButtonComponent } from "reusableComponents/ButtonComponent";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ava from "assets/icon/ava.jpg";
import MenuListComposition from "reusableComponents/MenuListComposition";

type PropsType = {
  disabled?: boolean;
};

export const Header: React.FC<PropsType> = (props) => {
  const location = useLocation();
  const [locat, setLocal] = useState<string>("");

  useEffect(() => {
    if (location.pathname === "/sign-in") {
      setLocal("sign-up");
    } else {
      setLocal("sign-in");
    }
  }, [location.pathname]);

  //pathname:"/sign-in"

  const { disabled = false } = props;
  const logined = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const goToRegisterHandler = () => {
    navigate("/" + locat);
  };

  return (
    <>
      <Wrapper>
        <Icon>
          <img src={incubaIcon} alt="incubaIcon" />
        </Icon>

        {logined ? (
          <LoginWrapper>
            <MenuListComposition />
            {/*<NameSpan>{profile.name}</NameSpan>*/}
            <Avatar style={{ marginTop: "-7px" }} alt="Remy Sharp" src={ava} sx={{ width: 40, height: 40 }} />
          </LoginWrapper>
        ) : (
          <ButtonCase>
            <ButtonComponent buttonName={locat} callback={goToRegisterHandler} disabled={disabled} />
          </ButtonCase>
        )}
      </Wrapper>
      <LineWithShadow />
    </>
  );
};

const LoginWrapper = styled.span`
  margin-top: 18px;
  display: flex;
`;

const Wrapper = styled.span`
  height: 60px;
  display: flex;
  justify-content: space-around;
`;

const ButtonCase = styled.span`
  height: 60px;

  & > button {
    margin-top: 10px;
  }
`;

const Icon = styled.span`
  & > img {
    width: 250px;
  }
`;

const LineWithShadow = styled.div`
  border-bottom: 1px solid #ffffff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.7);
`;
